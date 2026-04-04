const AIReport = require('../models/aiReport.model')

class aiReportRepository {
    async createAIReport(reportData){
        return await AIReport.create(reportData)
    }

    async getAIReportsByUser(userId){
        return await AIReport.find({
            user: userId,
            status: "completed"
        })
    }

    async getAIReport(aiReportId){
        return await AIReport.findById(aiReportId).select('-_v').lean()
    }
}

module.exports = new aiReportRepository()