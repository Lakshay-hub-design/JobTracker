const bcrypt = require('bcryptjs')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const sendEmail = require('../utils/sendEmail')

console.log("Type of sendEmail:", typeof sendEmail);


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


const forgotPasswordJWT = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Generate a short-lived JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    // Create reset link
    const resetURL = `${process.env.FRONTEND_URL}/reset-password/${token}`;

    // Email content
    const message = `
      <h2>Password Reset Request</h2>
      <p>Click below to reset your password:</p>
      <a href="${resetURL}">Reset Password</a>
      <p>This link will expire in 15 minutes.</p>
    `;
    console.log("Sending email to:", user?.email);

    await sendEmail(user.email, "Password Reset", message);

    res.status(200).json({ message: "Reset link sent to email" });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const resetPasswordJWT = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword; // Will be hashed in pre-save
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Reset Password Error:", error);
    res.status(400).json({ message: "Invalid or expired token" });
  }
};


module.exports = {register, login, forgotPasswordJWT, resetPasswordJWT}