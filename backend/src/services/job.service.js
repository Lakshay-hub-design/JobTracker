const uploadFile = require('../providers/storage.service')
const aiQueue = require('../queues/queue')
const aiReportRepository = require('../repositories/aiReport.repository')
const jobRepository = require('../repositories/job.repository')

const { ApiError } = require('../utils/apiError')
const extractResumeText = require('./resume.service')


const createJobService = async ({ body, file, userId }) => {
    const { company, position, status, jobType, location, appliedDate, notes, description, coverLetter, followUpDate } = body

    if (!company || !position) {
        throw new ApiError(400, "Company and position are required")
    }

    const allowedStatus = ["applied", "interviewing", "offered", "rejected"]

    if (status && !allowedStatus.includes(status)) {
        throw new ApiError(400, "Invalid status")
    }

    let resumeData = null
    let resumeText = ""

    if(file){
        resumeData = await uploadFile(file)
        resumeText = await extractResumeText(file.buffer)
    }

    const job = await jobRepository.createJob({
        company,
        position,
        status, 
        jobType,
        location,
        appliedDate: appliedDate || new Date(),
        notes,
        description,
        coverLetter,
        followUpDate,
        resume: resumeData,
        resumeText,
        createdBy: userId,
    })

    if(description){
        const aiReport = await aiReportRepository.createAIReport({
            job: job._id,
            user: userId,
            status: "pending"
        })

        await jobRepository.updateJob(job, {
            aiReport: aiReport._id
        })

        await aiQueue.add('process-job', {
            jobId: job._id,
            resumeText: resumeText || null,
            description,
            aiReportId: aiReport._id,
            userId
        }, {
            attempts: 3,
            backoff: {
                type: 'exponential',
                delay: 5000
            },
            removeOnComplete: true,
            removeOnFail: false
        })
    }

    return job
}

const generateAIReportService = async ({ jobId, file, body, userId }) => {
    const { description } = body
    let job = await jobRepository.getJobDetails(jobId, userId)

    if(!job){
        throw new ApiError(404, 'Job not found')
    }

    if (file) {
        const resumeData = await uploadFile(file)
        const resumeText = await extractResumeText(file.buffer)

        job = await jobRepository.updateJobById(
            job._id,
            userId,
            {
            resume: resumeData,
            resumeText: resumeText
        })

    }

    if (description) {
        job = await jobRepository.updateJobById(
            job._id, 
            userId,
            { description }
        )
    }

    if(!job.description || !job.resume?.url) {
        throw new ApiError(400, 'Missing resume and job description')
    }

    let report = await aiReportRepository.getAIReport(job.aiReport)

    if(!report){
        report = await aiReportRepository.createAIReport({
            job: jobId,
            user: userId,
            status: 'pending'
        })

        await jobRepository.updateJobById(
            job._id,
            userId,
            { aiReport: report._id }
        )
    }else {
        await aiReportRepository.updateAIReport(report._id, {
            status: 'pending'
        })
    }

    await aiQueue.add('process-job', {
        jobId,
        resumeText: job.resumeText,
        description: job.description,
        aiReportId: report._id,
        userId
    }, {
        attempts: 3,
        backoff: {
            type: 'exponential',
            delay: 5000
        },
        removeOnComplete: true,
        removeOnFail: false
    })

}

const getJobsService = async ({ userId, query }) => {

    const { status, jobType, search, page = 1, limit = 9 } = query
    
    const filter = { createdBy: userId }

    if(status){
        filter.status = status
    }

    if(jobType){
        filter.jobType = jobType
    }

    if(search){
        filter.$or = [
            { company: { $regex: search, $options: 'i' } },
            { position: { $regex: search, $options: 'i' } }
        ]
    }

    const skip = (page - 1) * limit

    const jobs = await jobRepository.getJobs(filter, skip, limit)

    const totalJobs = await jobRepository.countJobsByFilter(filter)

    return {
        jobs,
        pagination: {
            totalJobs,
            currentPage: Number(page),
            totalPages: Math.ceil(totalJobs / limit),
            limit: Number(limit)
        }
    }
}

const updateJobService = async ({ jobId, userId, data }) => {

    const job = await jobRepository.getJobDetails(jobId, userId)

    if(!job){
        throw new ApiError(404, 'Job not found')
    }

    const updatedJob = await jobRepository.updateJobById(jobId, userId, data)

    return updatedJob
}

const deleteJobService = async ({ jobId, userId }) => {
    const job = await jobRepository.deleteJob(jobId, userId)

    if(!job){
        throw new ApiError(404, 'Job not found')
    }
}

const getJobDetailsService = async ({ jobId, userId }) => {
    const job = await jobRepository.getJobDetails(jobId, userId)

    if(!job){
        throw new ApiError(404, 'Job not found')
    }

    let aiReport = null

    if(job.aiReport){
        aiReport = await aiReportRepository.getAIReport(job.aiReport)
    }

    return {
        job,
        aiReport
    }
}

const getDashboardStats = async (userId) => {

    const totalJobs = await jobRepository.countJobs(userId)

    const statusStatsRaw = await jobRepository.getStatusStats(userId)

    const statusStats = {
        applied: 0,
        interviewing: 0,
        offered: 0,
        rejected: 0
    }

    statusStatsRaw.forEach(item => {
        statusStats[item._id] = item.count
    })

    const monthlyStats =  await jobRepository.getMonthlyStats(userId)

    const recentJobs = await jobRepository.getRecentJobs(userId, 5)

    return {
        totalJobs,
        statusStats,
        monthlyStats,
        recentJobs
    }
}

const generateDashboardInsight = async (userId) => {

    const total = allJobs.length

    const offered = allJobs.filter(j => j.status === "offered").length
    const interviewing = allJobs.filter(j => j.status === "interviewing").length

    const successRate = total ? Math.round((offered / total) * 100) : 0
    const interviewRate = total ? Math.round((interviewing / total) * 100) : 0
    
    const latestInsightJob = await jobRepository.getLatestAIInsight(userId)

    const aiInsight = latestInsightJob?.aiInsight || null

    if (!aiInsight) {
        return {
        successRate,
        interviewRate,

        summary: "No AI insights yet",
        weakAreas: [],
        nextBestAction: "Add resume & job description to get personalized insights 🚀"
        
        }
    }

    return {
        successRate,
        interviewRate,
        summary: aiInsight.summary,
        weakAreas: aiInsight.weakAreas,
        nextBestAction: aiInsight.nextBestAction
    }
}

const getFullDashboardService = async ({userId}) => {

    const stats = await getDashboardStats(userId)
    const aiInsight = await generateDashboardInsight(userId)

    const weeklyApplications = await jobRepository.countThisWeek(userId)

    return{
        ...stats,
        aiInsight,
        weeklyGoal: {
            target: 5,
            completed: weeklyApplications
        }
    }
}

const getFollowUpsService  = async ({userId}) => {
    const today = new Date()

    const next5Days = new Date()
    next5Days.setDate(today.getDate() + 5)

    const jobs = await jobRepository.getFollowUpJobs(userId)

    const notifications = jobs.map(job => {
        const followDate = new Date(job.followUpDate)

        return {
        _id: job._id,
        jobId: job._id,
        company: job.company,
        position: job.position,
        followUpDate: followDate,
        type: followDate < today ? "overdue" : "upcoming"
        }
    })

    const filtered = notifications.filter(n => {
        return (
        n.type === "overdue" ||
        (n.type === "upcoming" && n.followUpDate <= next5Days)
        )
    })

    filtered.sort((a, b) => {
        return new Date(a.followUpDate) - new Date(b.followUpDate)
    })

    return filtered
}

module.exports = {
    createJobService,
    generateAIReportService,
    getJobsService,
    getJobDetailsService,
    getFullDashboardService,
    updateJobService,
    deleteJobService,
    getFollowUpsService
}