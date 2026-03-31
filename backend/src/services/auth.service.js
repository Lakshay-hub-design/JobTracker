const User = require('../models/user.model')
const Session = require('../models/session.model')
const { generateOtp, hashOtp } = require('../utils/generateOtp')
const { generateAccessToken, generateRefreshToken } = require('../utils/generateToken')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const emailService = require('../providers/sendMail')
const crypto = require('crypto')

const registerUser = async (data) => {
    const { name, email, password } = data

    const existing = await User.findOne({ email })

    if(existing){

        if(existing.isVerified){
            const error = new Error("User already exists")
            error.statusCode = 400
            throw error
        }

        const otp = generateOtp()
        const hashedOtp = hashOtp(otp) 
        
        existing.name = name
        existing.password = password
        existing.emailVerificationOtp = hashedOtp
        existing.emailVerificationOtpExpires = Date.now() + 10 * 60 * 1000

        await existing.save()
        await emailService.sendOtpEmail(email, otp)
        
        return existing
    }

    const otp = generateOtp()
    const hashedOtp = hashOtp(otp)

    const user = await User.create({
        name, 
        email, 
        password,
        emailVerificationOtp: hashedOtp,
        emailVerificationOtpExpires: Date.now() + 10 * 60 * 1000
    })

    await emailService.sendOtpEmail(email, otp)

    return user
}

const verifyEmailOtp = async ({ email, otp }) => {

    const hashedOtp = hashOtp(otp)

    const user = await User.findOne({
        email,
        emailVerificationOtp: hashedOtp,
        emailVerificationOtpExpires: { $gt: Date.now() }
    })

    if(!user){
        const error = new Error("Invalid or expired OTP")
        error.statusCode = 400
        throw error
    }

    user.isVerified = true
    user.emailVerificationOtp = undefined
    user.emailVerificationOtpExpires = undefined

    const accessToken = generateAccessToken(user)
    const refreshToken = generateRefreshToken(user)

    user.refreshToken = refreshToken
    await user.save()

    const refreshTokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex')

    await Session.create({
        user: user._id,
        refreshTokenHash,
        ip: req.ip,
        userAgent: req.headers['user-agent']
    })

    return {
        user,
        accessToken,
        refreshToken
    }
}

const resendEmailOtp = async (email) => {
    const user = await User.findOne({ email })

    if(!user){
        const error = new Error('User not found')
        error.statusCode = 400
        throw error
    }

    if(user.isVerified){
        throw new Error("User already verified")
    }

    const otp = generateOtp()
    const hashedOtp = hashOtp(otp)

    user.emailVerificationOtp = hashedOtp
    user.emailVerificationOtpExpires = Date.now() + 10 * 60 * 1000

    await user.save()

    await emailService.sendOtpEmail(email, otp)
}

const forgotPassword = async (email) => {
    const user = await User.findOne({ email })

    if(!user){
        const error = new Error('User not found')
        error.statusCode = 400
        throw error
    }

    const resetToken = user.getPasswordResetToken()
    await user.save({ validateBeforeSave: false })

    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`

    await emailService.sendForgotPasswordEmail(email, resetLink)
}

const resetPassrord = async (token, newPassword) => {
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex')

    const user = await User.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpires: { $gt: Date.now() }
    })

    if(!user){
        const error = new Error('Invalid or expired token')
        error.statusCode = 400
        throw error
    }

    user.password = newPassword
    user.resetPasswordToken = undefined
    user.resetPasswordExpires = undefined

    await user.save({ validateBeforeSave: false })
}

const refreshAccessToken = async (refreshToken) => {
    if(!refreshToken){
        const error = new Error('Refresh token not found')
        error.statusCode = 404
        throw error
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)

        const refreshTokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex')

        const session = await Session.findOne({
            refreshTokenHash,
            revoked: false,
        })

        if(!session){
            const error = new Error('Invalid refresh token')
            error.statusCode = 401
            throw error
        }

        const user = await User.findById(decoded.id)

        const newAccessToken = generateAccessToken(user)
        const newRefreshToken = generateRefreshToken(user)

        const newRefreshTokenHash = crypto.createHash('sha256').update(newRefreshToken).digest('hex')

        session.refreshTokenHash = newRefreshTokenHash
        await session.save()


        return {
            newAccessToken,
            newRefreshToken
        }
    } catch (error) {
        throw error
    }
}

const loginUser = async (data, req) => {
    const { email, password } = data

    const user = await User.findOne({ email }).select('+password')

    if(!user){
        const error = new Error('Invalid credentials')
        error.statusCode = 401
        throw error
    }

    const isMatch = await bcrypt.compare(password, user.password)
    // console.log(isMatch)

    if(!isMatch){
        const error = new Error('Invalid credentials')
        error.statusCode = 401
        throw error
    }

    if(!user.isVerified){
        const otp = generateOtp()
        const hashedOtp = hashOtp(otp)

        user.emailVerificationOtp = hashedOtp
        user.emailVerificationOtpExpires = Date.now() + 10 * 60 * 1000

        await user.save()

        await emailService.sendOtpEmail(user.email, otp)

        throw new Error("Email not verified. OTP sent again.")
    }

    const accessToken = generateAccessToken(user)
    const refreshToken = generateRefreshToken(user)

    const refreshTokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex')

    await Session.create({
        user: user._id,
        refreshTokenHash,
        ip: req.ip,
        userAgent: req.headers['user-agent']
    })

    return { user, accessToken, refreshToken }
}

const logoutUser = async (refreshToken) => {
    if(!refreshToken){
        const error = new Error('Refresh token not found')
        error.statusCode = 404
        throw error
    }

    const refreshTokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex')

    const session = await Session.findOne({
        refreshTokenHash,
        revoked: false,
    })

    if(!session){
        const error = new Error('Invalid refresh token')
        error.statusCode = 401
        throw error
    }

    session.revoked = true
    await session.save()
}

const logoutAllDevices = async (refreshToken) => {
    if(!refreshToken){
        const error = new Error('Refresh token not found')
        error.statusCode = 404
        throw error
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)

    await Session.updateMany({
        user: decoded.id,
        revoked: false
    }, {
        revoked: true
    })
}


module.exports = { 
    registerUser,
    verifyEmailOtp,
    resendEmailOtp,
    refreshAccessToken,
    loginUser,
    forgotPassword,
    resetPassrord,
    logoutUser,
    logoutAllDevices
}