const uploadFile = require('../providers/storage.service')
const aiQueue = require('../queues/queue')
const aiReportRepository = require('../repositories/aiReport.repository')
const jobRepository = require('../repositories/job.repository')
const authRepository = require('../repositories/user.repository')

const { updateApplicationObjective, getWeeklyObjectivesService } = require('../services/objective.service')
const { ApiError } = require('../utils/apiError')
const { reserveAIUsage, getCurrentAIUsage } = require('../utils/aiLimit.util')
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

    updateApplicationObjective(userId).catch(err => {
        console.error("Goal update failed:", err.message)
    })

    let aiLimitReached = false

    if(description){
        const canUseAI = await reserveAIUsage(userId)

        if(canUseAI){
            const aiReport = await aiReportRepository.createAIReport({
                job: job._id,
                user: userId,
                status: "pending"
            })

            await jobRepository.updateJob(job, {
                aiReport: aiReport._id
            })

            await aiQueue.add('process-job', {
                userId,
                jobId: job._id,
                resumeText: resumeText || null,
                description,
                aiReportId: aiReport._id,
            }, {
                attempts: 3,
                backoff: {
                    type: 'exponential',
                    delay: 5000
                },
                removeOnComplete: true,
                removeOnFail: false
            })
        }else {
            aiLimitReached = true
        }
    }

    return {
        job,
        aiLimitReached
    }
}

const generateAIReportService = async ({ jobId, file, body, userId }) => {
    const { description } = body || {}
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

    const canUseAI = await reserveAIUsage(userId)

    if (!canUseAI) {
        if (!report) {

            report = await aiReportRepository.createAIReport({
                job: jobId,
                user: userId,
                status: 'limit_reached'
            })

            await jobRepository.updateJobById(
                job._id,
                userId,
                {
                    aiReport: report._id
                }
            )

        } else {

            await aiReportRepository.updateAIReport(
                report._id,
                {
                    status: 'limit_reached'
                }
            )
        }

        throw new ApiError(403, 'User has reached daily AI processing limit')
    }

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

    const { status, jobType, search, page = 1, limit = 8 } = query
    
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

    const aiUsage = await getCurrentAIUsage(userId)

    let aiReport = null

    if(job.aiReport){
        aiReport = await aiReportRepository.getAIReport(job.aiReport)
    }

    return {
        job,
        aiReport,
        aiLimitReached: aiUsage.aiLimitReached,
        aiUsageToday: aiUsage.aiUsageToday,
        aiLimit: aiUsage.aiLimit
    }
}

const getDashboardStats = async (userId) => {

    const [
        totalJobs,
        statusStatsRaw,
        monthlyStats,
        recentJobs
    ] = await Promise.all([
        jobRepository.countJobs(userId),
        jobRepository.getStatusStats(userId),
        jobRepository.getMonthlyStats(userId),
        jobRepository.getRecentJobs(userId, 5)
    ])

    const statusStats = {
        applied: 0,
        interviewing: 0,
        offered: 0,
        rejected: 0
    }

    statusStatsRaw.forEach(item => {
        statusStats[item._id] = item.count
    })

    return {
        totalJobs,
        statusStats,
        monthlyStats,
        recentJobs
    }
}

const generateDashboardInsight = async (userId) => {

    const [allJobs, latestInsightJob, aiUsage ] = await Promise.all ([
        jobRepository.getAllJobsBasic(userId),
        jobRepository.getLatestAIInsight(userId),
        getCurrentAIUsage(userId)
    ])

    const total = allJobs.length

    const offered = allJobs.filter(j => j.status === "offered").length
    const interviewing = allJobs.filter(j => j.status === "interviewing").length

    const successRate = total ? Math.round((offered / total) * 100) : 0
    const interviewRate = total ? Math.round((interviewing / total) * 100) : 0
    
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

    const {
        aiUsageToday,
        aiLimit,
        aiLimitReached
    } = aiUsage

    return {
        successRate,
        interviewRate,

        aiUsageToday,
        aiLimit,
        aiLimitReached,
        
        summary: aiInsight.summary,
        weakAreas: aiInsight.weakAreas,
        nextBestAction: aiInsight.nextBestAction
    }
}

const getFullDashboardService = async ({userId}) => {

    const [stats, aiInsight, objectives] = await Promise.all([
        getDashboardStats(userId),
        generateDashboardInsight(userId),
        getWeeklyObjectivesService(userId)
    ])

    return{
        ...stats,
        aiInsight,
        objectives  
    }
}

const getFollowUpsService = async ({ userId }) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const next5Days = new Date()
  next5Days.setDate(today.getDate() + 5)

  const pastLimit = new Date()
  pastLimit.setDate(today.getDate() - 2)

  const jobs = await jobRepository.getFollowUpJobs(userId)

  const notifications = jobs
    .filter(job => !job.isFollowUpDone)
    .map(job => {
      const followDate = new Date(job.followUpDate)
      followDate.setHours(0, 0, 0, 0)

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
      (n.type === "overdue" && n.followUpDate >= pastLimit) ||
      (n.type === "upcoming" && n.followUpDate <= next5Days)
    )
  })

  filtered.sort((a, b) => a.followUpDate - b.followUpDate)

  return filtered
}

const markFollowUpDoneService = async ({ jobId, userId }) => {

  const job = await jobRepository.setFollowUpTrue(jobId, userId)

  if (!job) throw new ApiError(404, 'Job not found')
}

module.exports = {
    createJobService,
    generateAIReportService,
    getJobsService,
    getJobDetailsService,
    getFullDashboardService,
    updateJobService,
    deleteJobService,
    getFollowUpsService,
    markFollowUpDoneService
}