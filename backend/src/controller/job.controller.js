const jobModel = require('../models/job.model');

async function addJob(req, res){
    const { company, position, status, jobType, location, appliedDate, notes, description, resumeUrl, followUpDate } = req.body;
    try{
        const job = await jobModel.create({
            company,
            position,
            status,
            jobType,
            location,
            appliedDate: appliedDate ? new Date(appliedDate) : undefined,
            notes,
            description,
            resumeUrl,
            followUpDate,
            createdBy: req.user._id
        })
        return res.status(201).json({
            message: "job created",
            job
        })
    }
    catch(err){
        console.error("Created job error", err)
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

async function getJobs(req, res) {
    try{
        const jobs = await jobModel.find({ createdBy: req.user._id})
        .sort({ createdAt: -1})

        res.status(200).json({
            success: true,
            count: jobs.length,
            jobs
        })
    }
    catch(err){
        console.error("Get jobs error", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

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
        console.log(req.user._id)
        console.log(req.params.id)
        console.log(job)
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
    }
}

module.exports = {
    addJob,
    getJobs,
    updateJob,
    deleteJob
}