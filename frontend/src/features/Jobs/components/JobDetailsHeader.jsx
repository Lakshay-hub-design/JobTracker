import { PiBuildingApartmentFill } from "react-icons/pi";
import { FaLocationDot } from "react-icons/fa6";
import { MdWatchLater, MdOutlineUpdate } from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";
import { TbReportSearch } from "react-icons/tb";
import { useEffect, useRef, useState } from "react";

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}


const JobDetailsHeader = ({ job, aiReport, onAIAction, handleUpdate, aiLimitReached }) => {
  const [showStatusMenu, setShowStatusMenu] = useState(false)
  const desktopMenuRef = useRef()
  const mobileMenuRef = useRef()
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        (desktopMenuRef.current && desktopMenuRef.current.contains(e.target)) ||
        (mobileMenuRef.current && mobileMenuRef.current.contains(e.target))
      ) {
        return
      }

      setShowStatusMenu(false)
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])
    if(!job) return null
  
  const handleStatusUpdate = async (status) => {
    await handleUpdate({status}, "status")
    setShowStatusMenu(false)
  }

  const isPending = aiReport?.status === "pending"
  const isCompleted = aiReport?.status === "completed"
  const isFailed = aiReport?.status === "failed"

  const canGenerate =
    !aiReport && !aiLimitReached
  const limitBlocked =
    !aiReport && aiLimitReached

  return (
    <div>
      {/* Desktop View */}
      <div className="hidden md:grid grid-cols-4 gap-4">
        <div className="bg-white dark:bg-[#221F1E] p-6 px-10 rounded-xl col-span-3 shadow-sm flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold">{job.position}</h2>
            <p className="text-gray-700 dark:text-[#FFB59D] mt-1 text-lg capitalize font-semibold flex items-center gap-2">
              <PiBuildingApartmentFill className="text-orange-600" />
              {job.company}
            </p>

            <div className="flex items-center gap-4 mt-3 text-md text-gray-500 dark:text-[#fcbea9]">
              <span className="flex items-center gap-3">
                <FaLocationDot className="text-amber-900/80 dark:text-amber-600" />{" "}
                {job.location}
              </span>
              <span className="flex items-center gap-3">
                <MdWatchLater className="text-amber-900/80 dark:text-amber-600" />{" "}
                {job.jobType}
              </span>
            </div>
          </div>

          <div className="flex flex-col items-end gap-3">
            <span
              className={`px-5 py-1 rounded-full text-sm font-medium ${
                job.status === "applied"
                  ? "bg-blue-100 text-blue-600"
                  : job.status === "interviewing"
                    ? "bg-yellow-100 text-yellow-600"
                    : job.status === "rejected"
                      ? "bg-red-100 text-red-600"
                      : "bg-green-100 text-green-600"
              }`}
            >
              {job.status}
            </span>

            <div className="flex gap-2">
              <button
                onClick={onAIAction}
                disabled={isPending || limitBlocked}
                className={`px-6 py-3 rounded-full font-medium flex items-center gap-2 transition

                  ${
                    isCompleted
                      ? "bg-blue-100 text-blue-700 hover:bg-blue-200"

                    : isPending
                      ? "bg-gray-200 dark:bg-[#3c3c3c] text-gray-500 dark:text-gray-400 cursor-not-allowed"

                    : isFailed
                      ? "bg-red-100 text-red-600 hover:bg-red-200"

                    : limitBlocked
                      ? "bg-amber-500/10 border border-amber-500/20 text-amber-400 cursor-not-allowed"

                    : "bg-gray-200 text-blue-700 hover:bg-gray-100"
                  }
                `}
              >

                <TbReportSearch />

                {isCompleted && "View AI Report"}

                {isPending && "Generating..."}

                {isFailed && "Retry AI Report"}

                {canGenerate && "Generate AI Report"}

                {limitBlocked && "Daily Limit Reached"}

              </button>

              <div ref={desktopMenuRef} className="relative">
                <button
                  onClick={() => setShowStatusMenu((prev) => !prev)}
                  className="relative px-6 py-3 rounded-full bg-gray-300 dark:bg-[#FC9D7D] dark:text-[#212121] font-medium cursor-pointer hover:scale-105 transition hover:bg-gray-200 dark:hover:bg-[#f8b29a]"
                >
                  Update Status
                </button>
                {showStatusMenu && (
                  <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-[#221F1E] border dark:border-gray-500 rounded-lg shadow-lg z-50">
                    {["applied", "interviewing", "offered", "rejected"].map(
                      (status) => (
                        <div
                          key={status}
                          onClick={() => handleStatusUpdate(status)}
                          className={`px-4 py-2 text-sm cursor-pointer capitalize
                        ${job.status === status ? "bg-orange-100 dark:bg-orange-300 text-orange-600 dark:text-black" : "hover:bg-gray-100 dark:hover:bg-[#3c3c3c] "}
                      `}
                        >
                          {status}
                        </div>
                      ),
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-100 dark:bg-[#33302f] p-6 rounded-xl shadow-sm flex flex-col justify-between">
          <h3 className="uppercase font-medium text-sm text-gray-700 dark:text-[#faa082]">
            Applied Date
          </h3>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-medium">
              {formatDate(job.appliedDate)}
            </p>
            <FaRegCalendarAlt size={20} className="text-orange-400" />
          </div>
        </div>
      </div>
      {/* Mobile View */}
      <div className="md:hidden space-y-3">
        <p className="text-sm uppercase text-gray-400 tracking-wide">
          {job.company}
        </p>

        <h1 className="text-2xl font-bold leading-tight -mt-3">{job.position}</h1>

        <div className="flex flex-wrap gap-2">
          <span className="flex items-center gap-2 px-3 py-1 rounded-md bg-gray-200 truncate dark:bg-[#2a2726] text-sm text-gray-600 dark:text-gray-300">
            <FaLocationDot size={12} />
            {job.location}
          </span>

          <span className="flex items-center gap-2 px-3 py-1 rounded-md bg-gray-200 dark:bg-[#2a2726] text-sm text-gray-600 dark:text-gray-300">
            <MdWatchLater size={12} />
            {job.jobType}
          </span>

          <span
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              job.status === "applied"
                ? "bg-blue-500/20 text-blue-400"
                : job.status === "interviewing"
                  ? "bg-purple-500/20 text-purple-500"
                  : job.status === "rejected"
                    ? "bg-red-500/20 text-red-400"
                    : "bg-green-500/20 text-green-400"
            }`}
          >
            {job.status}
          </span>
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          Applied on{" "}
          <span className="text-black dark:text-white ">
            {formatDate(job.appliedDate)}
          </span>
        </p>

        <div className="flex gap-3">
          <button
            onClick={onAIAction}
            disabled={isPending || limitBlocked}
            className="flex-1 py-3 rounded-full bg-[#e7c3f3] dark:bg-[#2a2726] text-[#670f7d] dark:text-[#d6a1e3] dark:border-[0.5px] border-[#706b71] font-medium flex items-center justify-center gap-2"
          >
            <TbReportSearch size={16} />
            {isCompleted
              ? "View AI Report"
              : isPending
                ? "Generating..."
                : isFailed
                  ? "Retry AI Report"
                  : canGenerate
                  ? "Generate AI Report"
                  : "Daily Limit Reached"}
          </button>
          <div ref={mobileMenuRef} className="relative flex-1">
          <button
            onClick={() => setShowStatusMenu((prev) => !prev)}
            className=" w-full flex items-center gap-2 justify-center py-3 rounded-full bg-gray-200 dark:bg-[#2a2726]  font-medium"
          >
            <MdOutlineUpdate size={20}/>
            Update Status
          </button>
          {showStatusMenu && (
                  <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-[#221F1E] border dark:border-gray-500 rounded-lg shadow-lg z-50">
                    {["applied", "interviewing", "offered", "rejected"].map(
                      (status) => (
                        <div
                          key={status}
                          onClick={() => handleStatusUpdate(status)}
                          className={`px-4 py-2 text-sm cursor-pointer capitalize
                        ${job.status === status ? "bg-orange-100 dark:bg-orange-300 text-orange-600 dark:text-black" : "hover:bg-gray-100 dark:hover:bg-[#3c3c3c] "}
                      `}
                        >
                          {status}
                        </div>
                      ),
                    )}
                  </div>
                )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobDetailsHeader
