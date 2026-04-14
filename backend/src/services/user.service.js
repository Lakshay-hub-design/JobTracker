const aiReportRepository =  require("../repositories/aiReport.repository")
const jobRepository = require("../repositories/job.repository")
const userRepository = require("../repositories/user.repository")
const { ApiError } = require("../utils/apiError")
const uploadFile = require('../providers/storage.service')

const getProfileService = async (userId) => {
    const user = await userRepository.findById(userId)

    if(!user){
        throw new ApiError(404, 'User not found')
    }

    return user
}

const updateProfileService = async (userId, body, file) => {
  const updateFields = {};

  if (body.username) updateFields.username = body.username;

  let personalInfo = body.personalInfo;

  if (typeof personalInfo === "string") {
    try {
      personalInfo = JSON.parse(personalInfo);
    } catch (err) {
      throw new Error("Invalid personalInfo JSON");
    }
  }

  if (personalInfo) {
    Object.keys(personalInfo).forEach((key) => {
      updateFields[`personalInfo.${key}`] = personalInfo[key];
    });
  }

  if (file) {
    const uploaded = await uploadFile(file);

    updateFields["personalInfo.profileImage"] = {
      url: uploaded.url,
      publicId: uploaded.fileId,
    };
  }

  const updatedUser = await userRepository.updateUserById(userId, updateFields);

  return updatedUser;
};

const getStatsService = async (userId) => {
    const totalApplications = await jobRepository.countJobs(userId)
    
    const statusStatsRaw = await jobRepository.getStatusStats(userId)

    const statusStats = {
        applied: 0,
        interviewing: 0,
        offered: 0,
        rejected: 0
    }

    statusStatsRaw.forEach(item => {
        statusStats[item._id] = item.count
    })

    const aiReports = await aiReportRepository.countAIReports(userId)

    return {
        totalApplications,
        statusStats,
        aiReports
    }
}

const changePasswordService = async (userId, body) => {
    const { currentPassword, newPassword } = body

    if (!currentPassword || !newPassword) {
        throw new ApiError(400, "All fields are required")
    }

    const user = await userRepository.findByIdWithPassword(userId)

    if(!user){
        throw new ApiError(404, 'User not found')
    }

    const isMatch = await user.comparePassword(currentPassword)

    if (!isMatch) {
        throw new ApiError(400, "Current password is incorrect")
    }

    if (currentPassword === newPassword) {
        throw new ApiError(400, "New password must be different")
    }

    await userRepository.updateUser(user, {
        password: newPassword
    })
}

const updateThemeService = async (userId, body) => {
  
  const { theme } = body

  const user = await userRepository.updateUserById(
    userId,
    {theme}
  )


  return user.theme
}

module.exports = {
    getProfileService,
    updateProfileService,
    getStatsService,
    changePasswordService,
    updateThemeService
}