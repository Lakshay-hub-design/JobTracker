import React from 'react'
import { useProfile } from '../hooks/useProfile'
import ProfileHeader from '../components/ProfileHeader'
import ProfileStats from '../components/ProfileStats'
import ProfileTabs from '../components/ProfileTabs'

const ProfilePage = () => {
    const { profile, stats, loading, error, handleUpdateProfile, handleChangePassword, handleLogoutAll } = useProfile()
    
    if (loading) return <p>Loading profile...</p>
    if (error) return <p className="text-red-500">{error}</p>

    if (!profile) return null

  return (
    <div className='space-y-6 px-6'>
        <ProfileHeader 
          profile={profile}
          handleUpdateProfile={handleUpdateProfile}
        />

        <ProfileStats stats={stats} />

        <ProfileTabs
            profile={profile}
            handleUpdateProfile={handleUpdateProfile}
            handleChangePassword={handleChangePassword}
            handleLogoutAll={handleLogoutAll}
        />
    </div>
  )
}

export default ProfilePage
