const express = require('express');
const router = express.Router();
const jobController = require('../controller/jobController');
const auth = require('../middleware/authMiddleware'); // make sure path correct

// All routes protected
router.use(auth);

router.post('/', jobController.createJob);
router.get('/', jobController.getJobs);
router.get("/stats", jobController.getStats);
router.get("/:id", jobController.getJob);
router.put('/:id', jobController.updateJob);
router.delete('/:id', jobController.deleteJob);


module.exports = router;
