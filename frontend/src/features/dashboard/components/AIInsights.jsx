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
    <div className="bg-gradient-to-r from-[#d9480f] to-[#b9380a] text-white p-6 rounded-3xl mb-8 shadow-xl">
      <div className="flex justify-between items-center mb-8">
        <div className="flex">
          <span className="bg-white/20 px-3 py-1 rounded-full mr-2">
            AI Insight
          </span>
          <span className="text-sm opacity-80 flex items-center gap-1">
            <RiSparklingFill />
            AI-Powered Analysis
          </span>
        </div>

        <button className="mt-2 bg-white dark:bg-[#2f2c2b] text-orange-600 dark:text-[#e5cccc] px-4 py-3 rounded-full font-medium shadow-md hover:bg-gray-100">
          View Full AI Report →
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <div className="bg-white/10 backdrop-blur-lg p-5 rounded-xl border border-white/20">
          <div className="font-medium mb-1">
            <div className="flex items-center justify-center h-8 w-8 bg-blue-300/30 text-blue-200 rounded-full mb-2">
              <FaLightbulb />
            </div>
            <span className="text-sm">Insight</span>
          </div>
          <p className="text-sm opacity-90">
            You’ve been applying consistently — great job!
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg p-5 rounded-xl border border-white/20">
            <div className="font-medium mb-1">
                <div className="flex items-center justify-center h-8 w-8 bg-red-300/30 text-red-200 rounded-full mb-2">
                    <IoWarning />
                </div>
                <span className="text-sm">Weak Areas</span>
            </div>
            <ul className="text-sm opacity-90 list-disc list-inside">
            {weakAreas?.map((skill, index) => (
                <li key={index}>{skill}</li>
            ))}
            </ul>
        </div>

        <div className="bg-white/10 backdrop-blur-lg p-5 rounded-xl border border-white/20">
            <div className="font-medium mb-1">
                <div className="flex items-center justify-center h-8 w-8 bg-green-300/30 text-green-200 rounded-full mb-2">
                    <BsFillRocketTakeoffFill />
                </div>
                <span className="text-sm">Recommendation</span>
            </div>
            <p className="text-sm opacity-90">{suggession}</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg p-5 rounded-xl border border-white/20">
            <div className="font-medium mb-1">
                <div className="flex items-center justify-center h-8 w-8 bg-purple-300/30 text-purple-200 rounded-full mb-2">
                    <IoMdTrendingUp />
                </div>
                <span className="text-sm">Improvement Tips</span>
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
