const { Queue } = require('bullmq')
const redis = require('../config/redis')

const aiQueue = new Queue('ai-processing', {
    connection: redis
})

module.exports = aiQueue