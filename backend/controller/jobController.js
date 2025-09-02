const Job = require('../models/job');
const mongoose = require('mongoose')
// Create job
exports.createJob = async (req, res) => {
  try {
    const { company, position, status, jobType, location, appliedDate, notes, description, resumeUrl, followUpDate } = req.body;
    const job = await Job.create({
      company,
      position,
      status,
      jobType,
      location,
      appliedDate: appliedDate ? new Date(appliedDate) : undefined,
      notes,
      description,
      resumeUrl,
      followUpDate,
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
    const job = await Job.findOne({
      _id: req.params.id,
      createdBy: req.user.id
    });

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.status(200).json(job); // Directly send job object
  } catch (err) {
    console.error('Get Job error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


// Update job
exports.updateJob = async (req, res) => {
  try {
    const job = await Job.findOne({ _id: req.params.id, createdBy: req.user.id });
    if (!job) return res.status(404).json({ success: false, message: 'Job not found' });

    const allowed = ['company', 'position', 'status', 'jobType', 'appliedDate', 'notes', 'description', 'resumeUrl'];
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

exports.getStats = async (req, res) => {
  try {
    // 1. Find all jobs for the logged-in user
    const jobs = await Job.find({ createdBy: req.user.id });

    // 2. Count jobs for each status
    const stats = {
      applied: jobs.filter(job => job.status === 'applied').length,
      interview: jobs.filter(job => job.status === 'interview').length,
      offer: jobs.filter(job => job.status === 'offer').length,
      rejected: jobs.filter(job => job.status === 'rejected').length,
    };

    const typeCounts = {
      'full-time': jobs.filter(job => job.jobType === 'full-time').length,
      'part-time': jobs.filter(job => job.jobType === 'part-time').length,
      internship: jobs.filter(job => job.jobType === 'internship').length,
      remote: jobs.filter(job => job.jobType === 'remote').length
    };

    // 3. Send the response
    res.status(200).json({
      stats,
      totalJobs: jobs.length,
      typeCounts
    });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};