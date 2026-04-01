const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    company: { 
        type: String,
        required: [true, "Company name is required"],
        trim: true,
        lowercase: true
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
    location: {
      type: String,
      default: "Remote",
      required: [true, "Location is required"],
      trim: true,
    },
    jobType: {
      type: String,
      enum: ["full-time", "part-time", "internship", "remote"],
      default: "full-time",
    },
    followUpDate: {
      type: Date,
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
    aiReport: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "aiReport"
    }
  },
  { timestamps: true }
);

JobSchema.index({ createdBy: 1, status: 1 })
JobSchema.index({ createdBy: 1, appliedDate: -1 })
JobSchema.index({ createdBy: 1, status: 1, jobType: 1 })

module.exports = mongoose.model("job", JobSchema);
