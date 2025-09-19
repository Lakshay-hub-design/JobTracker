import React from 'react'
import NavBar from '../../components/dashboard/NavBar'
import UserInfo from '../../components/profile/UserInfo'
import UserImage from '../../components/profile/UserImage'
import { useTheme } from '../../context/ThemeContext'

const Profile = () => {
    const {theme, toggleTheme} = useTheme()
  
  return (
    <div className='dark:bg-[#000000] dark:text-white'>
        <NavBar theme={theme} toggleTheme={toggleTheme}/>
        <div className="min-h-screen bg-gray-50 dark:bg-[#000000] dark:text-white  p-8">
            <h1 className="text-3xl font-bold border-b-4 border-yellow-400 w-fit mb-8">
            Personal Information
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <UserInfo />
                <UserImage />
            </div>
        </div>
    </div>
  )
}

export default Profile