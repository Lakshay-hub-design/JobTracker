const uploadFile = require('../providers/storage.service')
const aiQueue = require('../queues/queue')
const aiReportRepository = require('../repositories/aiReport.repository')
const jobRepository = require('../repositories/job.repository')

const authRepository = require('../repositories/user.repository')
const extractResumeText = require('./resume.service')


const createJobService = async ({ body, file, userId }) => {
    const { company, position, status, jobType, location, appliedDate, notes, description, coverLetter, followUpDate } = body

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

    await jobRepository.saveJob(job, {
        aiReport: aiReport._id
    })

    await aiQueue.add('process-job', {
        jobId: job._id,
        resumeText,
        description,
        aiReportId: aiReport._id,
        userId
    })

    return job
}



module.exports = {
    createJobService
}