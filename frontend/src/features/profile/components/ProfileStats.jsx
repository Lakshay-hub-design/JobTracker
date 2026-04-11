import React from "react"

const ProfileStats = ({ stats }) => {
  if (!stats) return null

  const statsData = [
    { label: "Applications", value: stats.totalApplications, color: '#AB3807' },
    { label: "Interviews", value: stats.statusStats.interviewing, color: '#04639B' },
    { label: "Offers", value: stats.statusStats.offers, color: '#16A34A' },
    { label: "Rejections", value: stats.statusStats.rejections, color: '#BD2424' },
    { label: "AI Reports", value: stats.aiReports, color: "#985037" },
  ]

  return (
    <div className="grid grid-cols-5 gap-4">
      {statsData.map((item, index) => (
        <div
          key={index}
          className="bg-white p-5 rounded-xl shadow-sm flex flex-col items-center justify-center gap-1 hover:shadow-md transition"
        >
          <h3 style={{ color: item.color }} className={`text-3xl font-medium text-gray-800`}>
            {item.value || 0}
          </h3>
          <p className="text-sm font-bold text-gray-500">{item.label}</p>

        </div>
      ))}
    </div>
  )
}

export default ProfileStats