const uploadFile = require('../providers/storage.service')
const aiQueue = require('../queues/queue')
const aiReportRepository = require('../repositories/aiReport.repository')
const jobRepository = require('../repositories/job.repository')

const { ApiError } = require('../utils/apiError')
const extractResumeText = require('./resume.service')


const createJobService = async ({ body, file, userId }) => {
    const { company, position, status, jobType, location, appliedDate, notes, description, coverLetter, followUpDate } = body

    if (!company || !position) {
        throw new ApiError("Company and position are required", 400)
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
        appliedDate,
        notes,
        description,
        coverLetter,
        followUpDate,
        resume: resumeData,
        createdBy: userId,
    })

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

    return job
}

const getJobsService = async ({ userId, query }) => {

    const { status, search } = query
    
    const filter = { createdBy: userId }

    if(status){
        filter.status = status
    }

    if(search){
        filter.$or = [
            { company: { $regex: search, $options: 'i' } },
            { position: { $regex: search, $options: 'i' } }
        ]
    }

    const jobs = await jobRepository.getJobs(filter)

    return jobs
}

const updateJobService = async ({ jobId, userId, data }) => {

    const job = await jobRepository.getJobDetails(jobId, userId)
console.log(data)
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

    const total = await jobRepository.countJobs(userId)
    const offered = await jobRepository.countOfferedJobs(userId)

    const successRate = total ? Math.round((offered / total) * 100) : 0

    const reports = await aiReportRepository.getAIReportsByUser(userId)
    
    const skillMap = {}

    reports.forEach(report => {
        report.skillGaps.forEach(gap => {
            skillMap[gap.skill] = (skillMap[gap.skill] || 0) + 1
        })
    })

    const weakAreas = Object.entries(skillMap)
        .sort((a, b) =>  b[1] - a[1])
        .slice(0, 3)
        .map(item => item[0])

    return {
        successRate,
        weakAreas,
        suggession: weakAreas.length
            ? `Focus on improving: ${weakAreas.join(", ")}`
            : "You're doing great! Keep applying."
    }
}

const getFullDashboardService = async ({userId}) => {

    const stats = await getDashboardStats(userId)
    const aiInsight = await generateDashboardInsight(userId)

    return{
        ...stats,
        aiInsight
    }
}

module.exports = {
    createJobService,
    getJobsService,
    getJobDetailsService,
    getFullDashboardService,
    updateJobService,
    deleteJobService
}