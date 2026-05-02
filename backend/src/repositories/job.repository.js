const mongoose = require('mongoose')
const Job = require('../models/job.model')

class JobRepository {

    async createJob(jobData){
        return await Job.create(jobData)
    }

    async getJobs(filter, skip, limit){
        return await Job.find(filter)
            .select('-description -notes -resume')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean()
    }

    async getAllJobsBasic(userId){
        return await Job
            .find({ createdBy: userId })
            .select("status createdAt")
            .lean()
    }

    async getJobDetails(jobId, userId){
        return await Job.findOne({
            _id: jobId,
            createdBy: userId,
        })
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

    async getRecentJobs(userId, limit = 5){
        return await Job.find({ createdBy: userId })
            .select('company position status appliedDate')
            .sort({ createdAt: -1 })
            .limit(limit)
            .lean()
    }

    async getFollowUpJobs(userId) {
        return await Job.find({
            createdBy: userId,
            followUpDate: { $ne: null }
        }).select('-description -notes -resume')
    }

    async getLatestAIInsight(userId){
        return await Job
            .findOne({
            createdBy: userId,
            aiInsight: { $exists: true }
            })
            .sort({ "aiInsight.lastGenerated": -1 })
            .select("aiInsight")
            .lean()
    }

    async countJobs(userId){
        return await Job.countDocuments({ createdBy: userId })
    }

    async countJobsByFilter(filter){
        return await Job.countDocuments(filter)
    }

    async countOfferedJobs(userId){
        return await Job.countDocuments({
            createdBy: new mongoose.Types.ObjectId(userId),
            status: "offered"
        })
    }

    async countThisWeek(userId){
        const startOfWeek = new Date()
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay())

        return await Job.countDocuments({
            createdBy: userId,
            createdAt: { $gte: startOfWeek }
        })
    }

    async updateJob(job, data){
        Object.assign(job, data)
        return await job.save()
    }

    async updateJobById(jobId, userId, data){
        return await Job.findOneAndUpdate(
            { _id: jobId, createdBy: userId },
            data,
            { new: true, runValidators: true }
        )
    }

    async setFollowUpTrue(jobId, userId){
        return await Job.findOneAndUpdate(
            { _id: jobId, createdBy: userId },
            { isFollowUpDone: true },
            { new: true }
        )
    }

    async updateJobAIInsight(jobId, aiData){
        return await Job.findByIdAndUpdate(
            jobId,
            {
            aiInsight: {
                summary: aiData.summary,

                weakAreas: aiData.skillGaps
                ?.map(gap => gap.skill)
                .slice(0, 3) || [],

                nextBestAction:
                aiData.nextBestAction ||
                aiData.insights?.[0] ||
                "Keep applying and improving",

                matchScore: aiData.matchScore,

                lastGenerated: new Date()
            }
            },
            { new: true }
        )
    }

    async deleteJob(jobId, userId){
        return await Job.findOneAndDelete({
            _id: jobId,
            createdBy: userId
        })
    }

    async saveJob(job){
        return await job.save()
    }

}

module.exports = new JobRepository()