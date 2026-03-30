const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const crypto = require('crypto')

const personalInfoSchema = new mongoose.Schema({
    profileImage: {
      type: String,
      default: "",
    },

    phone: {
      type: String,
      match: [/^\d{10}$/, "Phone must be 10 digits"],
    },

    dob: {
      type: Date,
    },

    address: {
      type: String,
      trim: true,
      maxlength: 200,
    },

    country: {
      type: String,
      trim: true,
    },

    nationality: {
      type: String,
      trim: true,
    },

    bio: {
      type: String,
      maxlength: 300,
    },

    position: {
      type: String,
      trim: true,
    },  

    workPermit: {
      type: String,
      enum: ["Yes", "No"],
    },
}, {
    _id: false
})

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },
    email:{
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
        match: [
            /^\S+@\S+\.\S+$/,
            "Please use a valid email address",
        ],
        index: true,
    },
    password:{
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false,
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    emailVerificationOtp: {
      type: String,
      select: false,
    },
    emailVerificationOtpExpires: {
      type: Date,
      select: false,
    },
    resetPasswordToken: {
      type: String,
      select: false,
    },
    resetPasswordExpires: {
      type: Date,
      select: false,
    },
    personalInfo: [personalInfoSchema]
},{
    timestamps: true
})

userSchema.pre("save", async function () {
    if(!this.isModified('password')) return

    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash

    return
})

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.getPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex')

    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')
    this.resetPasswordExpires = Date.now() + 10 * 60 * 1000

    return resetToken
}

module.exports = mongoose.model('user', userSchema)