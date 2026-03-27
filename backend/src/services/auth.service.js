const User = require('../models/user.model')
const { generateOtp, hashOtp } = require('../utils/generateOtp')
const { generateAccessToken, generateRefreshToken } = require('../utils/generateToken')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const emailService = require('../providers/sendMail')

const registerUser = async (data) => {
    const { username, email, password } = data

    const existing = await User.findOne({ email })

    if(existing){

        if(existing.isVerified){
            const error = new Error("User already exists")
            error.statusCode = 400
            throw error
        }

        const otp = generateOtp()
        const hashedOtp = hashOtp(otp) 
        
        existing.username = username
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
        username, 
        email, 
        password,
        emailVerificationOtp: hashedOtp,
        emailVerificationOtpExpires: Date.now() + 10 * 60 * 1000
    })

    await emailService.sendOtpEmail(email, otp)

    return user
}

const verifyEmailOtp = async ({email, otp}) => {
    console.log(email, otp)
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

const refreshAccessToken = async (refreshToken) => {
    if(!refreshToken){
        const error = new Error('Refresh token not found')
        error.statusCode = 404
        throw error
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)

        const user = await User.findById(decoded.id)

        const newAccessToken = generateAccessToken(user)
        const newRefreshToken = generateRefreshToken(user)


        return {
            newAccessToken,
            newRefreshToken
        }
    } catch (error) {
        throw error
    }
}

const loginUser = async (data) => {
    const { email, password } = data
    console.log(password, email)
    const user = await User.findOne({ email })
    console.log(user.password, user.email)
    if(!user){
        const error = new Error('Invalid credentials')
        error.statusCode = 401
        throw error
    }

    const isMatch = await bcrypt.compare(password, user.password)
    console.log(isMatch)

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

    return { user, accessToken, refreshToken }
}

const logoutUser = async (refreshToken) => {
    if(!refreshToken){
        const error = new Error('Refresh token not found')
        error.statusCode = 404
        throw error
    }

}


module.exports = { 
    registerUser,
    verifyEmailOtp,
    resendEmailOtp,
    refreshAccessToken,
    loginUser,
    logoutUser,
}