const express = require('express')
const jobController = require('../controllers/job.controller')
const authMiddleware = require('../middlewares/auth.middleware')
const upload = require('../middlewares/file.middleware')

const router = express.Router();

router.post("/create-job", authMiddleware, upload.single("resume"), jobController.createJob)

router.get('/',authMiddleware, jobController.getJobs)
router.get('/:id', authMiddleware, jobController.getJobDetails)
router.get('/dashboard/full', authMiddleware, jobController.getFullDashboard)

// router.put('/:id', authMiddleware, jobController.updateJob)
// router.post('/delete/:id', authMiddleware, jobController.deleteJob)

module.exports = router