require("dotenv").config()

const { Worker } = require("bullmq")
const redis = require("../config/redis")
const aiReportModel = require("../models/aiReport.model")
const connectDB = require("../config/db")
const { generateAiReport } = require("../services/ai.service")

const startWorker = async () => {
  await connectDB()
  console.log("🟢 Worker DB connected")

  const worker = new Worker(
    "ai-processing",
    async (job) => {

      if (process.env.NODE_ENV !== "production") {
        console.log("🔥 Processing job:", job.id)
      }

      const { resumeText, description, aiReportId } = job.data

      try {
        const result = await generateAiReport({
          resumeText,
          jobDescription: description
        })

        await aiReportModel.findByIdAndUpdate(aiReportId, {
          status: "completed",
          ...result
        })

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

  worker.on("completed", job => {
    console.log(`✅ Job ${job.id} completed`)
  })

  worker.on("failed", (job, err) => {
    console.error(`❌ Job ${job.id} failed:`, err.message)
  })
}

startWorker()

process.on("uncaughtException", err => {
  console.error("Uncaught Exception:", err)
})

process.on("unhandledRejection", err => {
  console.error("Unhandled Rejection:", err)
})