const mongoose = require('mongoose')
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

    async getStatusStats(userId){
        return await Job.aggregate([
          { $match: { createdBy: new mongoose.Types.ObjectId(userId)} },
          {
            $group: {
                _id: "$status",
                count: { $sum: 1 }
            }
          }
        ])
    }

    async getMonthlyStats(userId){
        return await Job.aggregate([
            { $match: { createdBy: new mongoose.Types.ObjectId(userId) } },
            {
                $group : {
                    _id: {
                        year: { $year: '$createdAt' },
                        month: { $month: '$createdAt'}
                    },
                    count : { $sum: 1 }
                }
            },
            { $sort: { '_id.year': -1, '_id.month': -1 }},
            { $limit: 6 }
        ])
    }

    async countJobs(userId){
        return await Job.countDocuments({ createdBy: userId })
    }

    async countOfferedJobs(userId){
        return await Job.countDocuments({
            createdBy: new mongoose.Types.ObjectId(userId),
            status: "offered"
        })
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