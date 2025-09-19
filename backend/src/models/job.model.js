const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    company: { 
        type: String,
        required: true,
         trim: true
    },
    position: { 
        type: String,
        required: true,
        trim: true
    },
    status: {
      type: String,
      enum: ["applied", "interview", "offer", "rejected"],
      default: "applied",
    },
    location: {
      type: String,
      default: "Remote",
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
        default: ""
    },
    description: { 
        type: String, 
        default: "" 
    },
    resume: { 
        type: String, 
        default: "" 
    },
    coverLetter: { 
        type: String 
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("job", JobSchema);
