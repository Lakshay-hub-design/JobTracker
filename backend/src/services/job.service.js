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

module.exports = {
    createJobService,
    getJobsService,
    getJobDetailsService
}