const jobModel = require('../models/job.model');
const asyncHandler = require('../middlewares/asyncHandler');
const { createJobService, getJobsService, getJobDetailsService, getFullDashboardService, updateJobService, deleteJobService } = require('../services/job.service');

const createJob = asyncHandler(async (req, res) => {
    const job = await createJobService({
        body: req.body,
        file: req.file,
        userId: req.user._id
    });

    res.status(201).json({
        success: true,
        message: "Job created successfully",
        job
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
        jobs
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
        data: req.body
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

module.exports = {
    createJob,
    getJobs,
    getJobDetails,
    getFullDashboard,
    updateJob,
    deleteJob
}