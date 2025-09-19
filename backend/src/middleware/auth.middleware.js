const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model');

async function authMiddleware (req, res, next){
    const token = req.cookies.token
   

    if(!token){
        return res.status(401).json({
            message: "Please login first"
        })
    }

    try{
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        const user = await userModel.findById(decode.id)
        req.user = user
        next()
    }
    catch(err){
        return res.status(401).json({
            message: "Invalid token"
        })
    }
}

module.exports = authMiddleware