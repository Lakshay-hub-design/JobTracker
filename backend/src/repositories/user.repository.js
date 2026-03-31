const User = require('../models/user.model')

class AuthRepository {

    async findByEmail(email) {
        return await User.findOne({ email })
    }

    async findById(id) {
        return await User.findById(id)
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

    async createUser(userData){
        console.log("Creating user with data:", userData)
        return await User.create(userData)
    }

    async updateUser(user, data) {
        Object.assign(user, data)
        return await user.save()
    }

    async save(user, options = {}) {
        return user.save(options)
    }
}

module.exports = new AuthRepository()