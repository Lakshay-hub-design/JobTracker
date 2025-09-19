const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    profileImage: {
      type: String,
      default: "",
    },
    address: { type: String },
    country: { type: String },
    dob: { type: String },
    phone: { type: String },
    nationality: { type: String },
    position: { type: String },
    workPermit: { type: String },
    bio: { type: String },
},
{timeStamps: true}
)

module.exports = mongoose.model('user', userSchema)
