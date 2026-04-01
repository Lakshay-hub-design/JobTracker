const { uploadFile } = require('../providers/storage.service')
const jobRepository = require('../repositories/job.repository')
const aiReportRepository = require('../repositories/aiReport.repository')
const authRepository = require('../repositories/user.repository')


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

    const aiReport = await AIReport.create({
    job: job._id,
    user: userId,
    status: "pending"
  })

  // ✅ 5. Link AI report to job
  job.aiReport = aiReport._id
  await job.save()

  // ✅ 6. Trigger AI async (🔥 IMPORTANT)
  triggerAIProcessing({
    job,
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