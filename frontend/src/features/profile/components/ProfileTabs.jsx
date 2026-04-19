import React from 'react'
import { useState } from 'react'
import PersonalInfoTab from './PersonalInfoTab'
import PreferencesTab from './PreferencesTab'
import SecurityTab from './SecurityTab'

const ProfileTabs = ({ profile, handleUpdateProfile, handleChangePassword, handleLogoutAll }) => {
    const [activeTab, setActiveTab] = useState("personal")
  return (
<div className="bg-[#F5F3F2] dark:bg-[#292423] p-4 md:p-10 rounded-2xl shadow-sm">

  {/* 🔥 Tabs */}
  <div className="overflow-x-auto">
    <div className="flex gap-3 min-w-max border-b dark:border-[#3d3b3b] pb-3 mb-6">

      {[
        { key: "personal", label: "Personal Info" },
        { key: "preferences", label: "Preferences" },
        { key: "security", label: "Security" },
      ].map((tab) => (
        <button
          key={tab.key}
          onClick={() => setActiveTab(tab.key)}
          className={`
            whitespace-nowrap
            py-2 px-3 md:px-4
            text-sm md:text-base
            rounded-full font-bold transition
            ${
              activeTab === tab.key
                ? "bg-white dark:bg-[#3e3c3b] text-orange-600"
                : "text-gray-600 dark:text-[#807e7e]"
            }
          `}
        >
          {tab.label}
        </button>
      ))}

    </div>
  </div>

  {/* 🔥 Content */}
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
