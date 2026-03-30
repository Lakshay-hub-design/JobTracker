const mongoose = require('mongoose')

const sessionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  refreshTokenHash: String,
  userAgent: String,
  ip: String,
  revoked: {
    type: Boolean,
    default: false
  }
}, {
    timestamps: true
})

const Session = mongoose.model('session', sessionSchema)
module.exports = Session