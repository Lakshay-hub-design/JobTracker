const Job = require('../models/job.model')

class JobRepository {

    async createJob(jobData){
        return await Job.create(jobData)
    }

    async getJobs(filter){
        return await Job.find(filter)
            .select('-description -notes -resume')
            .sort({ createdAt: -1 })
            .lean()
    }

    async getJobDetails(jobId, userId){
        return await Job.findOne({
            _id: jobId,
            createdBy: userId,
        }).lean()
    }

    async updateJob(job, data){
        Object.assign(job, data)
        return await job.save()
    }

    async saveJob(job){
        return await job.save()
    }

}

module.exports = new JobRepository()