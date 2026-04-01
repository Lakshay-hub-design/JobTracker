const Job = require('../models/job.model')

class JobRepository {

    async createJob(jobData){
        return await Job.create(jobData)
    }

}

module.exports = new JobRepository()