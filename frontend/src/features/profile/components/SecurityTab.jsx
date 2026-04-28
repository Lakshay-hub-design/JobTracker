import React from 'react'
import { useState } from 'react'

const SecurityTab = ({ handleChangePassword, handleLogoutAll}) => {
    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    })

    const [message, setMessage] = useState(null)

    const handleChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async () => {
      setMessage(null)

      if (formData.newPassword !== formData.confirmPassword) {
        setMessage("Passwords do not match")
        return
      }

      const res = await handleChangePassword(formData)

      if (res.success) {
        setMessage("Password updated successfully")

        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: ""
        })
      } else {
        setMessage(res.error)
      }
    }

    const handleLogoutAllClick = async () => {
        await handleLogoutAll()
        setMessage("Logged out from all devices")
    }

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-medium">Security & Access</h3>
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-6 justify-between mb-8">
          <div>
            <label className='text-[#614942] dark:text-[#be856f] font-medium' htmlFor="">Current Password</label>
            <input
              type="password"
              name="currentPassword"
              placeholder="Current Password"
              value={formData.currentPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white dark:bg-[#3b3634] text-gray-600 dark:text-[#ada5a5] mt-2 rounded-md"
            />
          </div>

          <div>
            <label className='text-[#614942] dark:text-[#be856f] font-medium' htmlFor="">New Password</label>
            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white dark:bg-[#3b3634] text-gray-600 dark:text-[#ada5a5] mt-2 rounded-md"
            />
          </div>

          <div>
            <label className="text-[#614942] dark:text-[#be856f] font-medium" htmlFor="">
              Confirm New
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white dark:bg-[#3b3634] text-gray-600 dark:text-[#ada5a5] mt-2 rounded-md"
            />
          </div>
        </div>
        {message && <p className="text-sm text-gray-600 dark:text-red-600">{message}</p>}

        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-orange-600 text-white rounded-full hover:bg-orange-700 cursor-pointer"
        >
          Update Password
        </button>

        <button
          onClick={handleLogoutAllClick}
          className="px-6 py-2 text-[#BF2D2D] font-medium md:ml-10 cursor-pointer"
        >
          Logout All Devices
        </button>
      </div>

    </div>
  );
}

export default SecurityTab
