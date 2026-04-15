const express = require('express');
const cookieParser = require('cookie-parser')
const cors = require('cors');
const helmet = require('helmet')
const morgan = require('morgan')
const { rateLimit } = require('express-rate-limit')
const bullBoard = require('./config/bullBoard')

const app = express()

app.use(helmet())
app.use(morgan('dev'))

app.use(cors({
    origin: [ 
        process.env.FRONTEND_URL,
        `https://job-tracker-indol.vercel.app`
        ],
    credentials: true
}))

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests, please try again later"
})

app.use("/api", limiter)

app.use(express.json({ limit: "10kb" }))
app.use(cookieParser())

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date(),
  })
})

const authRoutes = require('./routes/auth.routes')
const jobRoutes = require('./routes/job.routes')
const userRoutes = require('./routes/user.routes')

app.use('/admin/queues', bullBoard.getRouter())

app.use('/api/auth' , authRoutes)
app.use('/api/job', jobRoutes)
app.use('/api/user', userRoutes)

module.exports = app