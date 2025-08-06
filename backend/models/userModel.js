const mongoose = require('mongoose')

const userSchema =  mongoose.Schema({
    username:{
        type: String,
        required: [true, 'Username is required'],
        trim: true,
        minlength: [3, 'Username must be at leat 3 character long'],
    },
    email:{
        type: String,
        required: [true, 'email is required'],
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
    },
},{timeStamps: true})

module.exports = mongoose.model("User", userSchema)