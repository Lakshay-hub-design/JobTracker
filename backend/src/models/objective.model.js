const mongoose = require('mongoose')

const objectiveSchema = new mongoose.Schema({
    userId: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        required: [true, "title is required"]
    },
    target: {
        type: Number,
        required: [true, "target is required"]
    },
    progress: {
        type: Number,
        default: 0
    },
    type: {
        type: String,
        enum: ["applications", "mock_interview", "custom"],
        required: true
    },
    isManual: {
        type: Boolean,
        default: false
    },
    weekId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["active", "completed"],
        default: "active"
    }
}, {timestamps: true})

const Objective = mongoose.model('objective', objectiveSchema)
module.exports = Objective