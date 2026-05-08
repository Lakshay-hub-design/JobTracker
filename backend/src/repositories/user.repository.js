const User = require('../models/user.model')

class AuthRepository {
    async findByEmail(email) {
        return await User.findOne({ email })
    }

    async findById(id) {
        return await User.findById(id)
    }

    async findByIdWithPassword(userId){
        return User.findById(userId).select("+password")
    }

    async findByEmailWithPassword(email) {
        return User.findOne({ email }).select("+password")
    }

    async findByEmailAndOtp(email, hashedOtp) {
        return User.findOne({
            email,
            emailVerificationOtp: hashedOtp,
            emailVerificationOtpExpires: { $gt: Date.now() }
        }).select("+emailVerificationOtp +emailVerificationOtpExpires")
    }

    async findByResetToken(hashedToken) {
        return User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpires: { $gt: Date.now() }
        })
    }

    async findById(id) {
        return User.findById(id)
    }

    async findByIdAndAIusage(userId) {
        return User.findById(userId).select("+aiUsageToday")
    }

    async createUser(userData){
        return await User.create(userData)
    }

    async updateUserById(userId, data){
        return User.findByIdAndUpdate(
            userId,
            data,
            { new: true, runValidators: true }
        )
    }

    async updateUser(user, data) {
        Object.assign(user, data)
        return await user.save({ validateBeforeSave: false })
    }

    async save(user, options = {}) {
        return user.save(options)
    }
}

module.exports = new AuthRepository()