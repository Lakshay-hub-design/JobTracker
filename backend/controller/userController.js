const User = require('../models/userModel')

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile" });
  }
};

// UPDATE PROFILE
const updateUserProfile = async (req, res) => {
  // Destructure all the fields you want to allow to be updated from the request body
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
  } = req.body;

  // Build the profile fields object based on what was sent
  const profileFields = {};
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

  try {
    // Find the user by ID (from the auth middleware) and update their data
    // The { new: true } option ensures the updated document is returned
    const user = await User.findByIdAndUpdate(
      req.user.id, // The user's ID is attached to the request by your auth middleware
      { $set: profileFields },
      { new: true }
    ).select('-password'); // Exclude the password from being returned

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Send the updated user object back to the frontend
    res.json(user);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const profileUpload = async (req, res) => {
  try {
    const userId = req.user.id;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profileImage: req.file.buffer.toString("base64") },
      { new: true }
    ).lean();

    res.json({
      success: true,
      profileImage: updatedUser.profileImage, // guaranteed string
      user: updatedUser,
    });
  } catch (err) {
    console.error("❌ Profile upload error:", err);
    res.status(500).json({ message: "Error updating profile" });
  }
};




module.exports = { getUserProfile, updateUserProfile, profileUpload }