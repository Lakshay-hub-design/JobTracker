const userModel = require('../models/user.model')
const storageService = require('../services/storage.service')
const { v4:uuid } = require('uuid')

async function imageUpload(req, res){
    try{
        const user = req.user
        if(!req.file){
            return res.status(400).json({message: "No file upload"})
        }

        const fileUploadResult = await storageService.uploadFile(req.file.buffer, uuid())

        const profileUpload = await userModel.findByIdAndUpdate(
            user.id, 
            {profileImage: fileUploadResult.url },
            {new: true}
        )   .select("-password");;

        if (!profileUpload) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(201).json({
            message: "Profile uploded succesfully",
            profile: profileUpload
        });
    } catch(err){
        console.error("Image upload error:", err);
        res.status(500).json({ message: "Something went wrong", error: err.message });
    }
}

async function getImage(req, res) {
    try{
        const user =  await userModel.findById(req.user.id).select('-password')
        res.json({user})
    } catch(err){
        res.status(500).json({message: "Failed to fetch user profile"})
    }
}

async function updateUserProfile(req, res) {
    const {    
    username,
    address,
    country,
    dob,
    phone,
    nationality,
    position,
    workPermit,
    bio,
    profileImage,
    } = req.body

    const profileFields = {}
    if (username) profileFields.username = username;
    if (address) profileFields.address = address;
    if (country) profileFields.country = country;
    if (dob) profileFields.dob = dob;
    if (phone) profileFields.phone = phone;
    if (nationality) profileFields.nationality = nationality;
    if (position) profileFields.position = position;
    if (workPermit) profileFields.workPermit = workPermit;
    if (bio) profileFields.bio = bio;
    if (profileImage) profileFields.profileImage = profileImage;

    try{
        const user = await userModel.findByIdAndUpdate(req.user.id,
            { $set: profileFields },
             { new: true, runValidators: true }
        ).select('-password')
        if (!user) {
        return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({
            message: "User info updated",
            user
        })
    }catch(err){
        console.error("Update user profile error:", err.message);
        res.status(500).json({
            message: "Failed to Update user info"
        })
    }
}

module.exports = {
    imageUpload,
    getImage,
    updateUserProfile
}