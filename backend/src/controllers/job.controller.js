const jobModel = require('../models/job.model');
const asyncHandler = require('../middlewares/asyncHandler');
const { createJobService, getJobsService, getJobDetailsService, getFullDashboardService } = require('../services/job.service');

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

async function updateJob(req, res){
    try{
    
        const {company, position, status, location, jobType, notes, description, resumeUrl} = req.body
        const job = await jobModel.findOneAndUpdate({ _id: req.params.id, createdBy: req.user._id},
            {
                company,
                position,
                status,
                location,
                jobType,
                notes,
                description,
                resumeUrl
            },
            { new: true, runValidators: true}
        );
        if(!job){
            return res.status(404).json({
                message: 'job not found or not authorized'
            })
        }
        res.status(200).json({
            message: "Job updated succesfully",
            job
        })
    } catch (err) {
        res.status(500).json({ message: "Error updating job", error: err.message });
    }
}

async function deleteJob(req, res){
    try {
        const job = await jobModel.findOneAndDelete({ _id: req.params.id, createdBy: req.user._id})
        if(!job){
            return res.status(404).json({ success: false, message: 'Job not found' })
        }
        res.status(200).json({
            message: "Job deleted succesfully"
        })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
        console.error("Delete job error", error);
    }
}

module.exports = {
    createJob,
    getJobs,
    getJobDetails,
    getFullDashboard,
    updateJob,
    deleteJob
}