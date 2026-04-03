require("dotenv").config({ path: "../.env" })

const { Worker } = require('bullmq');
const redis = require('../config/redis');
const aiReportModel = require('../models/aiReport.model');
const connectDB = require('../config/db');
const { generateAiReport } = require("../services/ai.service");

connectDB()

const worker = new Worker(
    'ai-processing',
    async (job) => {

        console.log("🔥 Processing job:", job.id)
        
        const { resumeText, description, aiReportId } = job.data
        
        try{
            const result = await generateAiReport({
                resumeText,
                jobDescription: description
            })

            await aiReportModel.findByIdAndUpdate(aiReportId, {
                status: 'completed',
                ...result
            })

            console.log("✅ AI Report Updated")
        }catch(err){
            console.error("❌ Error:", err)

            console.log( `Attempt ${job.attemptsMade + 1} failed out of ${job.opts.attempts}` )

            if(job.attemptsMade === job.opts.attempts - 1){
                await aiReportModel.findByIdAndUpdate(aiReportId, {
                    status: "failed",
                    error: err.message || "Unknown error occurred during AI report generation"
                })
            }

            throw err
        }
    },
    {
        connection: redis
    }
)

module.exports = worker