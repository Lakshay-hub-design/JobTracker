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
    <div>
      <div className="hidden md:grid grid-cols-5 gap-4">
        {statsData.map((item, index) => (
          <div
            key={index}
            className="bg-white dark:bg-[#221F1E] p-5 rounded-xl shadow-sm flex flex-col items-center justify-center gap-1 hover:shadow-md transition"
          >
            <h3
              style={{ color: item.color }}
              className={`text-3xl font-medium text-gray-800`}
            >
              {item.value || 0}
            </h3>
            <p className="text-sm font-bold text-gray-500 dark:text-[#aba8a8]">
              {item.label}
            </p>
          </div>
        ))}
      </div>
      <div className="grid md:hidden grid-cols-2 gap-4">
        {/* LEFT COLUMN */}
        <div className="flex flex-col gap-4">
          {/* Big Card 1 */}
          <div className="bg-white dark:bg-[#221F1E] p-5 rounded-2xl min-h-[118px] flex flex-col justify-end">
            <h3 className="text-3xl font-bold text-orange-500">
              {statsData[0].value}
            </h3>
            <p className="text-sm text-gray-500">Applications</p>
          </div>

          {/* Big Card 2 */}
          <div className="bg-white dark:bg-[#221F1E] p-5 rounded-2xl min-h-[118px] flex flex-col justify-end">
            <h3 className="text-3xl font-bold text-blue-500">
              {statsData[1].value}
            </h3>
            <p className="text-sm text-gray-500">Interviews</p>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex flex-col gap-3">
          {statsData.slice(2).map((item, index) => (
            <div
              key={index}
              className="bg-white dark:bg-[#221F1E] p-4 rounded-2xl min-h-[60px] flex items-center justify-between"
            >
              <div>
                <h3 style={{ color: item.color }} className="text-xl font-bold">
                  {item.value || 0}
                </h3>
                <p className="text-xs text-gray-500">{item.label}</p>
              </div>

              {item.icon}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProfileStats