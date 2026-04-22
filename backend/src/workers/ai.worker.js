require("dotenv").config()

const { Worker } = require("bullmq")
const redis = require("../config/redis")
const aiReportModel = require("../models/aiReport.model")
const { generateAiReport } = require("../services/ai.service")
const jobRepository = require("../repositories/job.repository")

const startWorker = async () => {
console.log("🟢 Worker started")
  const worker = new Worker(
    "ai-processing",
    async (job) => {

      if (process.env.NODE_ENV !== "production") {
        console.log("🔥 Processing job:", job.id)
      }

      const { resumeText, description, aiReportId, jobId } = job.data

      try {
        const result = await generateAiReport({
          resumeText,
          jobDescription: description
        })

        await aiReportModel.findByIdAndUpdate(aiReportId, {
          status: "completed",
          ...result
        })

        await jobRepository.updateJobAIInsight(jobId, result)

      } catch (err) {
        console.error("❌ Error:", err.message)

        if (job.attemptsMade === job.opts.attempts - 1) {
          await aiReportModel.findByIdAndUpdate(aiReportId, {
            status: "failed",
            error: err.message || "AI generation failed"
          })
        }

        throw err
      }
    },
    {
      connection: redis
    }
  )

  if(process.env.NODE_ENV !== 'production'){
    worker.on("completed", job => {
        console.log(`✅ Job ${job.id} completed`)
    })
  }

  worker.on("failed", (job, err) => {
    console.error(`❌ Job ${job.id} failed:`, err.message)
  })
}

process.on("uncaughtException", err => {
  console.error("Uncaught Exception:", err)
})

process.on("unhandledRejection", err => {
  console.error("Unhandled Rejection:", err)
})

module.exports = startWorker