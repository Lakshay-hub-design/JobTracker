const express = require('express')
const jobController = require('../controllers/job.controller')
const authMiddleware = require('../middlewares/auth.middleware')
const router = express.Router();

router.post('/add-job', authMiddleware, jobController.addJob)
router.get('/jobs',authMiddleware, jobController.getJobs)

router.put('/:id', authMiddleware, jobController.updateJob)
router.post('/delete/:id', authMiddleware, jobController.deleteJob)

module.exports = router