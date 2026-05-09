const mongoose = require('mongoose');

const technicalQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, 'Technical questions is required']
    },
    intention:{
        type: String,
        required: [true, 'Intention is required']
    },
    answer: {
        type: String,
        required: [true, 'Answer is required']
    }
}, {
    _id: false
})

const behaviouralQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, 'Technical questions is required']
    },
    intention:{
        type: String,
        required: [true, 'Intention is required']
    },
    answer: {
        type: String,
        required: [true, 'Answer is required']
    }
}, {
    _id: false
})

const skillGapSchema = new mongoose.Schema({
    skill: {
        type: String,
        required: [true, 'Skill is required']
    },
    severity: {
        type: String,
        enum: ['low', 'medium', 'high'],
        required: [true, 'Severity is required']
    }
}, {
    _id: false
})

const preprationPlanSchema = new mongoose.Schema({
    day: {
        type: Number,
        required: [true, 'Day is required']
    },
    focus: {
        type: String,
        required: [true, 'Focus is required']
    },
    tasks: [{
        type: String,
        required: [true, 'Task is required']
    }]
}, {
    _id: false
})

const aiReportSchema = new mongoose.Schema({
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'job',
        required: [true, 'Job reference is required'],
        index: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: [true, 'User reference is required'],
        index: true
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed', 'not_ready'],
        default: 'not_ready'
    },
    matchScore:{
        type: Number,
        min: 0,
        max: 100
    },
    technicalQuestions: [technicalQuestionSchema],
    behaviouralQuestions: [behaviouralQuestionSchema],
    skillGaps: [skillGapSchema],
    preparationPlan: [preprationPlanSchema],
    summary: {
        type: String
    },

    insights: [{
        type: String
    }],

    strengths: [{
        type: String
    }],
    nextBestAction: {
        type: String
    },
    error: {
        type: String
    }
}, {
    timestamps: true
})

aiReportSchema.index({ job: 1, user: 1 }, { unique: true })

const aiReportModel = mongoose.model('aiReport', aiReportSchema);
module.exports = aiReportModel;