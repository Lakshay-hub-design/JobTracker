import React from 'react'
import { useProfile } from '../hooks/useProfile'
import ProfileHeader from '../components/ProfileHeader'
import ProfileStats from '../components/ProfileStats'
import ProfileTabs from '../components/ProfileTabs'
import ProfileSkeleton from '../components/ProfileSkelton'

const ProfilePage = () => {
    const { profile, stats, loading, handleUpdateProfile, handleChangePassword, handleLogoutAll } = useProfile()
    
    if (loading) return <ProfileSkeleton />
    if (!profile) return null

  return (
    <div className='space-y-6'>
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
