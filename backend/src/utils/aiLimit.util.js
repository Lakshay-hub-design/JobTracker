const User = require('../models/user.model')

const DAILY_AI_LIMIT = 5

const getTodayDate = () => {
    return new Date().toISOString().split('T')[0]
}

const reserveAIUsage = async (userId) => {

    const today = getTodayDate()

    await User.findOneAndUpdate(
        {
            _id: userId,
            aiUsageDate: { $ne: today }
        },
        {
            $set: {
                aiUsageDate: today,
                aiUsageToday: 0
            }
        }
    )

    const updatedUser = await User.findOneAndUpdate(
        {
            _id: userId,
            aiUsageToday: { $lt: DAILY_AI_LIMIT }
        },
        {
            $inc: {
                aiUsageToday: 1
            }
        },
        {
            new: true
        }
    )

    return !!updatedUser
}

const rollbackAIUsage = async (userId) => {
    await User.findOneAndUpdate(
        {
            _id: userId,
            aiUsageToday: { $gt: 0 }
        },
        {
            $inc: {
                aiUsageToday: -1
            }
        }
    )
}

const getCurrentAIUsage = async (userId) => {

    const today = getTodayDate()

    const user = await User.findById(userId)

    if (!user) {
        throw new Error("User not found")
    }

    // Reset if new day
    if (user.aiUsageDate !== today) {

        user.aiUsageDate = today
        user.aiUsageToday = 0

        await user.save()
    }

    return {
        aiUsageToday: user.aiUsageToday,
        aiLimit: DAILY_AI_LIMIT,
        aiLimitReached: user.aiUsageToday >= DAILY_AI_LIMIT
    }
}

module.exports = {
    reserveAIUsage,
    rollbackAIUsage,
    getCurrentAIUsage
}