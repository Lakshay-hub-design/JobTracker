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

    async updateAIReport(reportId, updateData) {
        return await AIReport.findByIdAndUpdate(
            reportId,
            updateData,
            { new: true }
        )
    }

    async countAIReports(userId){
        return await AIReport.countDocuments({
            user: userId,
            status: 'completed'
        })
    }
}

module.exports = new aiReportRepository()