const Job = require('../models/job.model')

class JobRepository {

    async createJob(jobData){
        return await Job.create(jobData)
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