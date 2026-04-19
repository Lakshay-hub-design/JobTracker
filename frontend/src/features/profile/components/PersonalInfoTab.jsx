import React from 'react'
import { useState } from 'react'

const PersonalInfoTab = ({ profile, handleUpdateProfile }) => {
    const [formData, setFormData] = useState({  
        username: profile.username || "",
        email: profile.email || "",
        location: profile.personalInfo?.location || "",
        bio: profile.personalInfo?.bio || "",
    })

    const handleChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async () => {
        const data = {
        username: formData.username,
        personalInfo: {
            location: formData.location,
            bio: formData.bio,
        },
        }

        await handleUpdateProfile(data)
    }
  return (
    <div className="space-y-6">

      <h2 className='text-2xl font-medium'>Personal Details</h2>

      <div className='flex flex-col md:flex-row justify-between gap-6 w-full'>

        <div className='md:w-1/2'>
          <label className="text-[#614942] dark:text-[#be856f] font-medium">Full Name</label>
          <input
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-2 bg-white dark:bg-[#3b3634] text-gray-600 dark:text-[#ada5a5] rounded-md"
          />
        </div>
        <div className='md:w-1/2'>
          <label className="text-[#614942] dark:text-[#be856f] font-medium">Email Address (Read-only)</label>
          <h3 className="w-full mt-1 p-2 bg-[#EDEBEA] dark:bg-[#3b3634] text-gray-600 dark:text-[#ada5a5] rounded-md">
            {formData.email}
          </h3>
        </div>
      
      </div>

      <div>
        <label className="text-[#614942] dark:text-[#be856f] font-medium">Location</label>
        <input
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="w-full mt-1 px-4 py-2 bg-white dark:bg-[#3b3634] text-gray-600 dark:text-[#ada5a5] rounded-md"
        />
      </div>

      <div>
        <label className="text-[#614942] dark:text-[#be856f] font-medium">Bio</label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          className="w-full mt-1 px-4 py-2 bg-white dark:bg-[#3b3634] text-gray-600 dark:text-[#ada5a5] rounded-md resize-none"
          rows={4}
        />
      </div>

      <button
        onClick={handleSubmit}
        className="px-6 py-2 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition cursor-pointer"
      >
        Save Changes
      </button>

    </div>
  )

}

export default PersonalInfoTab
