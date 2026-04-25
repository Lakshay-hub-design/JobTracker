import { ArrowRight } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { IoBusiness } from "react-icons/io5";

const getStatusStyle = (status) => {
    switch(status){
        case 'interviewing':
            return 'bg-orange-400/20 text-orange-600'
        case 'offered':
            return 'bg-green-400/20 text-green-600'
        case 'applied':
            return 'bg-blue-400/20 text-blue-600'
        default:
            return 'bg-gray-400/20 text-gray-600'
    }
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

const RecentJobs = ({jobs}) => {
    const navigate = useNavigate()

    if (!jobs || jobs.length === 0) {
        return (
        <div className="bg-white p-6 rounded-xl shadow-sm">
            <p className="text-gray-500">No recent jobs found</p>
        </div>
        )
    }

  return (
    <div className="md:px-6">
      <div className="bg-white dark:bg-[#151312] rounded-4xl p-4 md:p-5  shadow-md">
        {/* 🔥 Header */}
        <div className="flex justify-between sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
          <h2 className="text-base md:text-lg font-semibold text-gray-800 dark:text-[#B1ABA9]">
            Recent Applications
          </h2>

          <button
            onClick={() => navigate("/jobs")}
            className="text-orange-600 dark:text-[#A27567] text-sm md:text-base font-medium hover:underline"
          >
            View All
          </button>
        </div>

        {/* 🔴 Desktop Table Header */}
        <div className="hidden md:grid grid-cols-4 text-sm bg-gray-100 dark:bg-[#1D1B1A] text-gray-500 dark:text-[#A27567] px-4 py-2 font-semibold rounded-xl">
          <span>COMPANY</span>
          <span>POSITION</span>
          <span>STATUS</span>
          <span>APPLIED DATE</span>
        </div>

        {/* 🔥 Data */}
        <div className="mt-3 space-y-3">
          {jobs.map((job, index) => (
            <div key={index}>
              {/* 📱 Mobile Card */}
              <div className="md:hidden bg-gray-50 dark:bg-[#1D1B1A] p-4 rounded-xl space-y-3">
                {/* Top */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-semibold text-lg uppercase`}>
                      {job.company ? job.company.charAt(0) : "?"}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 dark:text-[#ccc] capitalize">
                        {job.company}
                      </p>
                      <p className="text-xs text-gray-500">{job.position}</p>
                    </div>
                  </div>

                  <ArrowRight
                    onClick={() => navigate(`/job/${job._id}`)}
                    className="text-gray-400 cursor-pointer"
                  />
                </div>

                {/* Bottom */}
                <div className="flex justify-between items-center text-sm">
                  <span
                    className={`px-3 py-1 rounded-full font-medium capitalize ${getStatusStyle(job.status)}`}
                  >
                    {job.status}
                  </span>

                  <span className="text-gray-500">
                    {formatDate(job.appliedDate)}
                  </span>
                </div>
              </div>

              {/* 💻 Desktop Row */}
              <div className="hidden md:grid grid-cols-4 items-center px-4 py-3 hover:bg-gray-50 dark:hover:bg-[#1e1d1d] transition rounded-lg">
                {/* Company */}
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-semibold text-lg uppercase bg-[#e6e2e2] dark:bg-[#222222]`}>
                    {job.company ? job.company.charAt(0) : "?"}
                  </div>
                  <span className="font-medium capitalize text-gray-800 dark:text-[#797878]">
                    {job.company}
                  </span>
                </div>

                {/* Position */}
                <div className="text-gray-700 dark:text-[#797878]">
                  {job.position}
                </div>

                {/* Status */}
                <div>
                  <span
                    className={`px-3 py-1 text-sm rounded-full font-medium capitalize ${getStatusStyle(job.status)}`}
                  >
                    {job.status}
                  </span>
                </div>

                {/* Date */}
                <div className="text-gray-500 dark:text-[#797878] flex justify-between items-center">
                  {formatDate(job.appliedDate)}

                  <ArrowRight
                    onClick={() => navigate(`/job/${job._id}`)}
                    className="text-gray-400 hover:scale-110 cursor-pointer hover:text-gray-600"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RecentJobs
