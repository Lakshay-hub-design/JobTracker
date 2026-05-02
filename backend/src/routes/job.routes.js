const express = require('express')
const jobController = require('../controllers/job.controller')
const authMiddleware = require('../middlewares/auth.middleware')
const upload = require('../middlewares/file.middleware')

const router = express.Router();

router.post("/add-job", authMiddleware, upload.single("resume"), jobController.createJob)
router.post('/generate/:id', authMiddleware, upload.single('resume'), jobController.generateAIReport)

router.get('/',authMiddleware, jobController.getJobs)
router.get('/followups', authMiddleware, jobController.getFollowUps)
router.patch("/followup/:jobId/done", authMiddleware, jobController.markFollowUpDone)
router.get('/:id', authMiddleware, jobController.getJobDetails)
router.get('/dashboard/full', authMiddleware, jobController.getFullDashboard)

router.patch('/:id', authMiddleware, jobController.updateJob)
router.delete('/:id', authMiddleware, jobController.deleteJob)

module.exports = router