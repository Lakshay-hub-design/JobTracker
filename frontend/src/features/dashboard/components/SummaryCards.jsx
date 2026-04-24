import React from 'react'   
import { FaFileAlt, FaComments, FaTrophy, FaTimesCircle } from "react-icons/fa";

const getBarColors = (color) => {
  const map = {
    orange: [
      "bg-orange-300/20",
      "bg-orange-300/30",
      "bg-orange-300/25",
      "bg-orange-300/40",
      "bg-orange-300"
    ],
    red: [
      "bg-red-300/20",
      "bg-red-300/30",
      "bg-red-300/25",
      "bg-red-300/40",
      "bg-red-300"
    ],
    green: [
      "bg-lime-300/20",
      "bg-lime-300/30",
      "bg-lime-300/25",
      "bg-lime-300/40",
      "bg-lime-300"
    ]
  };

  return map[color] || map.orange;
};

const iconColors = {
  orange: "#FFB694",
  red: "text-red-300",
  green: "#DFED1A"
};

const SummaryCards = ({data}) => {
    const { totalJobs, statusStats } = data || {}
  return (
    <div className='grid grid-cols-2 md:grid-cols-4 gap-6 px-6 mt-4 mb-8'>

        <Card 
            title="Total Applications" 
            value={totalJobs} 
            change="+8"
            icon={<FaFileAlt />}
            color="orange"
            bars={[20, 40, 30, 60, 80]}
        />
        
        <Card 
            title="Interviewing"
            value={statusStats?.interviewing || 0}
            change='+12'
            icon={<FaComments />}
            color="orange"
            bars={[30, 20, 35, 25, 70]}
        />

        <Card 
            title="Offers Received"
            value={statusStats?.offered || 0}
            change='+5'
            icon={<FaTrophy />}
            color="green"
            bars={[15, 15, 15, 15, 90]}
        />

        <Card 
            title="Rejections"
            value={statusStats?.rejected || 0}
            change='+3'
            icon={<FaTimesCircle />}
            color="orange"
            bars={[40, 60, 30, 50, 35]}
        />

    </div>
  )
}


const Card = ({ title, value, change, icon, bars, color }) => {
    const shades = getBarColors(color)
    return (
            <div className="bg-[#1A1A1B] rounded-3xl p-5 w-full  
    border border-white/5 shadow-lg hover:scale-105 transition duration-300">

      {/* Top Section */}
      <div className="flex justify-between items-center mb-4">
        <div className={`p-3 rounded-full bg-[#2A2A2D] text-lg`}
        style={{ color: iconColors[color] }}
        >
          {icon}
        </div>

        <span className={`text-xs font-semibold text-[#DFED1A]`}>
          {change}
        </span>
      </div>

      {/* Label */}
      <p className="text-[10px] uppercase tracking-widest text-[#856457] mb-1">
        {title}
      </p>

      {/* Value */}
      <h2 className="text-3xl font-bold text-white mb-1">
        {value}
      </h2>

      {/* Bars */}
      <div className="flex items-end gap-1 h-10">
        {bars.map((h, i) => (
          <div
            key={i}
            style={{ height: `${h}%` }}
            className={`flex-1 rounded-sm ${shades[i]}`}
          />
        ))}
      </div>
    </div>
    )
}

export default SummaryCards