require("dotenv").config({ path: "../.env" })

const { Worker } = require('bullmq');
const redis = require('../config/redis');
const aiReportModel = require('../models/aiReport.model');
const connectDB = require('../config/db')

connectDB()

const worker = new Worker(
    'ai-processing',
    async (job) => {

        console.log("🔥 Processing job:", job.id)
        
        const { jobId, resumeText, description, aiReportId   } = job.data
        
        try{
            const result = {
                score: 85,
                suggestions: ["Improve keywords", "Add projects"]
            }
            await aiReportModel.findByIdAndUpdate(aiReportId, {
                status: 'completed',
                result
            })

            console.log("✅ AI Report Updated")
        }catch(err){
            console.error("❌ Error:", err)

            await aiReportModel.findByIdAndUpdate(aiReportId, {
                status: "failed"
            })
        }
    },
    {
        connection: redis
    }
)

module.exports = worker