const AIReport = require('../models/aiReport.model')

class aiReportRepository {
    async createAIReport(reportData){
        return await AIReport.create(reportData)
    }
}

module.exports = new aiReportRepository()