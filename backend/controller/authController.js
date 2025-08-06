const bcrypt = require('bcryptjs')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
    const {username, email, password} = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try{
        const existing = await User.findOne({email});

        if(existing){
            return res.status(400).json({message: "Email already registered"})
        }

        if(password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters' });
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = await User.create({
            username,
            email,
            password: hashedPassword,
        })

        const token = jwt.sign({id: user._id }, process.env.JWT_SECRET , {
            expiresIn: "7d",
        })

        res.status(201).json({
            message: 'User registred successfully',
            user:{
                id: user._id,
                username: user.username,
                email: user.email
            },
            token
        })
    } catch(err) {
        console.error(err)
        res.status(500).json({message: "Server error"})
    }
}

const login = async (req, res) =>{
    const {email, password} = req.body;
    
    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }


    try{
        const user = await User.findOne({email})
        if(!user){
           return res.status(400).json({message: "Invalid email or password"})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({message: "invalid email or password"})
        }

        const token =  jwt.sign({id: user._id}, process.env.JWT_SECRET,{
            expiresIn: "7d"
        })

        res.status(200).json({
            message: "Login Successfull",
            user:{
                id: user._id,
                username: user.username,
                email: user.email,
            },
            token
        })

    }catch(err){
        console.error(err)
        res.status(500).json({message: "Server error"})
    }
}

module.exports = {register, login}