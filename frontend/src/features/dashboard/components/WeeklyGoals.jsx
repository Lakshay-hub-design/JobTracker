const WeeklyGoals = ({ data }) => {

  const progress = data?.progress || 0

  return (
    <div className="dark:bg-[#1A1A1B] rounded-4xl p-6 border border-white/5 shadow-lg">

      <p className="text-xs text-[#FFB694] tracking-wide uppercase mb-4">
        Weekly Objectives
      </p>

      {/* Apply Jobs */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-300 space-y-3">
          <span className="">Apply to {data.target} jobs</span>
          <span>{data.completed}/{data.target}</span>
        </div>

        <div className="w-full h-2 bg-[#353436] rounded-full">
          <div
            className="h-2 bg-orange-500 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Mock interviews (static for now) */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-300 space-y-3">
          <span>Complete 2 mock interviews</span>
          <span>0/2</span>
        </div>

        <div className="w-full h-2 bg-[#353436] rounded-full">
          <div className="h-2 bg-orange-500 rounded-full w-[10%]" />
        </div>
      </div>

      {/* Portfolio */}
      <div>
        <div className="flex justify-between text-sm text-gray-300 space-y-3">
          <span>Update portfolio case studies</span>
          <span className="text-[#504f4f]">Done</span>
        </div>

        <div className="w-full h-2 bg-gray-700 rounded-full">
          <div className="h-2 bg-[#C3D000] rounded-full w-full" />
        </div>
      </div>

    </div>
  )
}

export default WeeklyGoals