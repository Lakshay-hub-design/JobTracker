const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  company: { type: String, required: true, trim: true },
  position: { type: String, required: true, trim: true },
  status: {
    type: String,
    enum: ['applied', 'interview', 'offer', 'rejected'],
    default: 'applied'
  },
  location: {
    type: String,
    default: "Remote",
  },
  jobType: {
    type: String,
    enum: ['full-time', 'part-time', 'internship', 'remote'],
    default: 'full-time'
  },
  appliedDate: { type: Date, default: Date.now },
  notes: { type: String, default: '' },
  resumeUrl: { type: String, default: '' }, // optional (for resume upload)
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Job', JobSchema);