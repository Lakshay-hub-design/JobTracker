const Job = require('../models/job');

// Create job
exports.createJob = async (req, res) => {
  try {
    const { company, position, status, jobType, location, appliedDate, notes, resumeUrl } = req.body;
    const job = await Job.create({
      company,
      position,
      status,
      jobType,
      location,
      appliedDate: appliedDate ? new Date(appliedDate) : undefined,
      notes,
      resumeUrl,
      createdBy: req.user.id // assuming auth middleware adds req.user
    });
    res.status(201).json({ success: true, job });
  } catch (err) {
    console.error('Create Job error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get all jobs for user (with optional filters & pagination)
exports.getJobs = async (req, res) => {
  try {
    const { status, jobType, search, page = 1, limit = 20 } = req.query;
    const query = { createdBy: req.user.id };

    if (status) query.status = status;
    if (jobType) query.jobType = jobType;
    if (search) {
      query.$or = [
        { company: { $regex: search, $options: 'i' } },
        { position: { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Job.countDocuments(query);
    const jobs = await Job.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    res.json({ success: true, jobs, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    console.error('Get Jobs error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get single job
exports.getJob = async (req, res) => {
  try {
    const job = await Job.findOne({ _id: req.params.id, createdBy: req.user.id });
    if (!job) return res.status(404).json({ success: false, message: 'Job not found' });
    res.json({ success: true, job });
  } catch (err) {
    console.error('Get Job error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Update job
exports.updateJob = async (req, res) => {
  try {
    const job = await Job.findOne({ _id: req.params.id, createdBy: req.user.id });
    if (!job) return res.status(404).json({ success: false, message: 'Job not found' });

    const allowed = ['company', 'position', 'status', 'jobType', 'appliedDate', 'notes', 'resumeUrl'];
    allowed.forEach((key) => {
      if (req.body[key] !== undefined) job[key] = req.body[key];
    });

    await job.save();
    res.json({ success: true, job });
  } catch (err) {
    console.error('Update Job error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Delete job
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findOneAndDelete({ _id: req.params.id, createdBy: req.user.id });
    if (!job) return res.status(404).json({ success: false, message: 'Job not found' });
    res.json({ success: true, message: 'Job deleted' });
  } catch (err) {
    console.error('Delete Job error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
