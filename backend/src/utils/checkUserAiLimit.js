const User = require('../models/user.model');

const checkUserAILimit = async (userId) => {
    const user = await User.findById(userId);

    const today = new Date().toDateString();

    if (user.lastAIDate !== today) {
        user.aiUsageToday = 0;
        user.lastAIDate = today;
        await user.save();
    }

    return user.aiUsageToday < 5;
};

const incrementAIUsage = async (userId) => {
    await User.findByIdAndUpdate(userId, {
        $inc: { aiUsageToday: 1 }
    });
};

module.exports = { checkUserAILimit, incrementAIUsage };