import React from 'react'
import { useState } from 'react'
import PersonalInfoTab from './PersonalInfoTab'
import PreferencesTab from './PreferencesTab'
import SecurityTab from './SecurityTab'

const ProfileTabs = ({ profile, handleUpdateProfile, handleChangePassword, handleLogoutAll }) => {
    const [activeTab, setActiveTab] = useState("personal")
  return (
    <div className="bg-[#F5F3F2] dark:bg-[#292423] p-10 rounded-2xl shadow-sm">
      <div className="flex gap-6 border-b dark:border-[#3d3b3b] pb-3 mb-6">
        <button
          onClick={() => setActiveTab("personal")}
          className={`pb-2 py-2 px-4 rounded-full font-bold ${
            activeTab === "personal"
              ? "bg-white dark:bg-[#3e3c3b] text-orange-600"
              : "text-gray-600 dark:text-[#807e7e]"
          }`}
        >
          Personal Info
        </button>

        <button
          onClick={() => setActiveTab("preferences")}
          className={`pb-2 py-2 px-4 rounded-full font-bold ${
            activeTab === "preferences"
              ? "bg-white dark:bg-[#3e3c3b] text-orange-600"
              : "text-gray-600 dark:text-[#807e7e]"
          }`}
        >
          Preferences
        </button>

        <button
          onClick={() => setActiveTab("security")}
          className={`pb-2 py-2 px-4 rounded-full font-bold ${
            activeTab === "security"
              ? "bg-white dark:bg-[#3e3c3b] text-orange-600"
              : "text-gray-600 dark:text-[#807e7e]"
          }`}
        >
          Security
        </button>   
      </div>
        <div>
            {activeTab === "personal" && (
            <PersonalInfoTab
                profile={profile}
                handleUpdateProfile={handleUpdateProfile}
            />
            )}

            {activeTab === "preferences" && (
            <PreferencesTab
                profile={profile}
                handleUpdateProfile={handleUpdateProfile}
            />
            )}

            {activeTab === "security" && (
            <SecurityTab
                handleChangePassword={handleChangePassword}
                handleLogoutAll={handleLogoutAll}
            />
            )}
        </div>
    </div>
  )
}

export default ProfileTabs
