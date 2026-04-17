import { RiSparklingFill } from "react-icons/ri"
import { FaLightbulb } from "react-icons/fa6"
import { IoWarning } from "react-icons/io5"
import { BsFillRocketTakeoffFill } from "react-icons/bs"
import { IoMdTrendingUp } from "react-icons/io"

const AIInsights = ({ insights }) => {
    if(!insights) {
        return <div>Loading insights...</div>
    }
    const { weakAreas, suggession } = insights
  return (
    <div className="bg-gradient-to-r from-[#d9480f] to-[#b9380a] text-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl mb-6 sm:mb-8 shadow-xl">

  {/* HEADER */}
  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">

    {/* Left Section */}
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
      <span className="bg-white/20 px-3 py-1 rounded-full text-xs sm:text-sm w-fit">
        AI Insight
      </span>

      <span className="text-xs sm:text-sm opacity-80 flex items-center gap-1">
        <RiSparklingFill />
        AI-Powered Analysis
      </span>
    </div>

    {/* Button */}
    <button className="w-full sm:w-auto text-center bg-white dark:bg-[#2f2c2b] text-orange-600 dark:text-[#e5cccc] px-4 py-2 sm:py-3 rounded-full font-medium shadow-md hover:bg-gray-100 transition">
      View Full AI Report →
    </button>

  </div>

  {/* CARDS */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">

    {/* CARD */}
    <div className="bg-white/10 backdrop-blur-lg p-4 sm:p-5 rounded-xl border border-white/20">
      <div className="flex items-center gap-2 mb-2">
        <div className="flex items-center justify-center h-8 w-8 bg-blue-300/30 text-blue-200 rounded-full">
          <FaLightbulb />
        </div>
        <span className="text-sm font-medium">Insight</span>
      </div>
      <p className="text-sm opacity-90">
        You’ve been applying consistently — great job!
      </p>
    </div>

    {/* CARD */}
    <div className="bg-white/10 backdrop-blur-lg p-4 sm:p-5 rounded-xl border border-white/20">
      <div className="flex items-center gap-2 mb-2">
        <div className="flex items-center justify-center h-8 w-8 bg-red-300/30 text-red-200 rounded-full">
          <IoWarning />
        </div>
        <span className="text-sm font-medium">Weak Areas</span>
      </div>

      <ul className="text-sm opacity-90 list-disc list-inside">
        {weakAreas?.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
    </div>

    {/* CARD */}
    <div className="bg-white/10 backdrop-blur-lg p-4 sm:p-5 rounded-xl border border-white/20">
      <div className="flex items-center gap-2 mb-2">
        <div className="flex items-center justify-center h-8 w-8 bg-green-300/30 text-green-200 rounded-full">
          <BsFillRocketTakeoffFill />
        </div>
        <span className="text-sm font-medium">Recommendation</span>
      </div>
      <p className="text-sm opacity-90">{suggession}</p>
    </div>

    {/* CARD */}
    <div className="bg-white/10 backdrop-blur-lg p-4 sm:p-5 rounded-xl border border-white/20">
      <div className="flex items-center gap-2 mb-2">
        <div className="flex items-center justify-center h-8 w-8 bg-purple-300/30 text-purple-200 rounded-full">
          <IoMdTrendingUp />
        </div>
        <span className="text-sm font-medium">Improvement Tips</span>
      </div>
      <p className="text-sm opacity-90">
        Try mock interviews focused on your weak areas to build confidence and improve.
      </p>
    </div>

  </div>
</div>
  );
}

export default AIInsights
