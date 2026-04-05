import React from 'react'   
import {
    Calendar1,
    FileText,
    TrendingUp,
    TrendingDown,
    BadgeCheck,
    XCircle
} from 'lucide-react'



const SummaryCards = ({data}) => {
    const { totalJobs, statusStats } = data || {}
  return (
    <div className='grid grid-cols-4 gap-5 mb-8'>

        <Card 
            title="Total Applications" 
            value={totalJobs} 
            change="8"
            icon='FileText'
            color="orange"
        />
        
        <Card 
            title="Interviewing"
            value={statusStats?.interviewing || 0}
            change='12'
            icon='Calendar1'
            color="red"
        />

        <Card 
            title="Offers Received"
            value={statusStats?.offered || 0}
            change='5'
            icon='BadgeCheck'
            color="blue"
        />

        <Card 
            title="Rejections"
            value={statusStats?.rejected || 0}
            change='3'
            icon='XCircle'
            color="red"
        />

    </div>
  )
}

const iconMap = {
  FileText: FileText,
  Calendar1: Calendar1,
  BadgeCheck: BadgeCheck,
  XCircle: XCircle,
};

const colorMap = {
  orange: {
    icon: "text-orange-500",
    bg: "bg-orange-100",
  },
  blue: {
    icon: "text-blue-500",
    bg: "bg-blue-100",
  },
  red: {
    icon: "text-red-500",
    bg: "bg-red-100",
  },
};

const Card = ({ title, value, change, icon, color }) => {
    const Icon = iconMap[icon]
    const colorStyle = colorMap[color]
    const isPositive = change >= 0
    return (
        <div className='flex flex-col justify-between bg-white rounded-4xl shadow-sm p-4 w-full max-w-sm border border-gray-100'>
            

            <div className="flex justify-between gap-2">
                <div className={`w-10 h-10 flex items-center justify-center rounded-xl ${colorStyle.bg}`}>
                    <Icon className={`${colorStyle.icon}`} />
                </div>
        
                {/* Change % */}
                <span
                className={`flex items-center gap-2 text-sm font-semibold ${
                    isPositive ? "text-green-500" : "text-red-500"
                }`}
                >
                    {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />} {Math.abs(change)}%
                </span>

            </div>

            <div className=''>
                <p className='text-sm text-gray-500 font-medium tracking-wide'>{title}</p>
                <h2 className='text-2xl font-bold text-gray-900 mt-1'>{value}</h2>
            </div>

        </div>
    )
}

export default SummaryCards