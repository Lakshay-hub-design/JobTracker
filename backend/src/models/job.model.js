const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    company: { 
        type: String,
        required: [true, "Company name is required"],
        trim: true,
    },
    position: { 
        type: String,
        required: [true, "Position title is required"],
        trim: true
    },
    status: {
      type: String,
      enum: ["applied", "interviewing", "offered", "rejected"],
      default: "applied",
    },
    statusHistory: [
      {
        status: String,
        date: { type: Date, default: Date.now }
      }
    ],
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    workplace: {
      type: String,
      enum: ["remote", "onsite", "hybrid"],
      default: "onsite"
    },
    jobType: {
      type: String,
      enum: ["full-time", "part-time", "internship"],
      default: "full-time",
    },
    followUpDate: {
      type: Date,
    },
    isFollowUpDone: {
      type: Boolean,
      default: false
    },
    appliedDate: { 
        type: Date,
        default: Date.now
    },
    notes: { 
        type: String,
        default: "",
        trim: true,
        maxLength: [1000, "Notes cannot exceed 1000 characters"]
    },
    description: { 
        type: String, 
        default: "",
        trim: true,
    },
    resume: { 
        url: String,
        fileId: String 
    },
    resumeText: {
      type: String,
      default: ""
    },
    coverLetter: { 
        type: String,
        trim: true,
        maxLength: [2000, "Cover letter cannot exceed 2000 characters"]
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "Created by is required"],
    },
    aiInsight: {
      summary: String,
      weakAreas: [String],
      nextBestAction: String,
      matchScore: Number,
      lastGenerated: Date
    },
    aiReport: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "aiReport"
    }
  },
  { timestamps: true }
);

JobSchema.index({ createdBy: 1, status: 1 })
JobSchema.index({ createdBy: 1, appliedDate: -1 })
JobSchema.index({ company: 'text', position: 'text' })
JobSchema.index({ createdBy: 1, status: 1, jobType: 1 })

module.exports = mongoose.model("job", JobSchema);