const jobModel = require('../models/job.model');
const asyncHandler = require('../middlewares/asyncHandler');
const { createJobService, getJobsService, getJobDetailsService, getFullDashboardService, updateJobService, deleteJobService, generateAIReportService, getFollowUpsService, markFollowUpDoneService } = require('../services/job.service');

const createJob = asyncHandler(async (req, res) => {
    const result = await createJobService({
        body: req.body,
        file: req.file,
        userId: req.user._id
    });

    res.status(201).json({
        success: true,
        message: "Job created successfully",
        data: result
    })
})

const generateAIReport = asyncHandler(async (req, res) => {
    await generateAIReportService({
        jobId: req.params.id,
        file: req.file,
        body: req.body,
        userId: req.user._id
    })

    return res.status(201).json({
        success: true,
        message: 'AI Report generated succesfully'
    })
})

const getJobs = asyncHandler(async (req, res) => {

    const jobs = await getJobsService({
        userId: req.user.id,
        query: req.query
    })

    res.status(200).json({
        success: true,
        message: 'Jobs fetched succesfully',
        data: jobs
    })
})

const getJobDetails = asyncHandler(async (req, res) => {

    const data = await getJobDetailsService({
        jobId: req.params.id,
        userId: req.user.id
    })

    res.status(200).json({
        success: true,
        message: 'Job details fetched succesfully',
        ...data
    })
})

const getFullDashboard = asyncHandler(async (req, res) => {
    const data = await getFullDashboardService({
        userId: req.user.id
    })

    res.status(200).json({
        success: true,
        message: 'Dashboard data fetched succesfully',
        ...data
    })
})

const updateJob = asyncHandler(async (req, res) => {
    const updatedJob = await updateJobService({
        jobId: req.params.id,
        userId: req.user.id,
        data: req.body,
        file: req.file
    })

    res.status(200).json({
        success: true,
        message: 'Job updated successfully',
        job: updatedJob
    })
})


const deleteJob = asyncHandler(async (req, res) => {
    await deleteJobService({
        jobId: req.params.id,
        userId: req.user.id
    })

    res.status(200).json({
        success: true,
        message: 'Job deleted successfully'
    })
})

const getFollowUps = asyncHandler(async (req, res) => {
  const userId = req.user.id

  const notifications = await getFollowUpsService({ userId })

  res.status(200).json({
    success: true,
    count: notifications.length,
    data: notifications
  })
})

const markFollowUpDone = asyncHandler(async (req, res) => {
    await markFollowUpDoneService({ 
        jobId: req.params.jobId,
        userId: req.user.id
     })

    res.status(200).json({
        success: true,
    })
})

module.exports = {
    createJob,
    generateAIReport,
    getJobs,
    getJobDetails,
    getFullDashboard,
    updateJob,
    deleteJob,
    getFollowUps,
    markFollowUpDone
}