import React, { useState } from 'react'
import { MdEdit } from "react-icons/md";
import { IoShareSocialSharp } from "react-icons/io5";
import { Download, FileText, Upload } from 'lucide-react';
import FollowUpCard from './FollowUpCard';
import { useJobs } from '../hooks/useJob';
import toast from 'react-hot-toast';

const JobDetailsMain = ({ job, setShowDrawer, handleUpdate }) => {
  const [showReschedule, setShowReschedule] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)
  const { handleMarkDone } = useJobs()
  const handleReschedule = async (date) => {
    if (!date) return

     const selected = new Date(date);
      selected.setHours(0, 0, 0, 0);

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selected < today) {
        toast.error("Cannot set past date");
        return;
      }

      const actionType = job.followUpDate
        ? "followup-updated"
        : "followup-added";

    await handleUpdate(
      { followUpDate: new Date(date).toISOString(),
        isFollowUpDone: false
      },
      actionType
    )
  }

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-6">
        <div className="bg-white dark:bg-[#221F1E] p-6 rounded-2xl shadow-sm">
          <div className="text-md font-semibold dark:text-[#b08173] mb-3">
            <span className="bg-amber-800 p-1 rounded-full mr-2"></span>
            Job Description
          </div>
          <p className="text-sm text-gray-700 dark:text-[#c2c2c2] whitespace-pre-line">
            {job.description || "No description available"}
          </p>
        </div>

        <div className="bg-white dark:bg-[#221F1E] p-6 rounded-xl shadow-sm">
          <div className="text-md font-semibold mb-3 dark:text-[#b08173]">
            <span className="bg-amber-800 p-1  rounded-full mr-2"></span>
            Cover Letter
          </div>
          <p className="text-sm text-gray-700 dark:text-[#ccc7c7] bg-gray-100 dark:bg-[#322f2e] p-2 rounded-2xl whitespace-pre-line">
            {job.coverLetter || "No cover letter added"}
          </p>
        </div>

        <div className="bg-white dark:bg-[#221F1E] p-6 rounded-xl shadow-sm">
          <div className="text-md font-semibold mb-3 dark:text-[#b08173]">
            <span className="bg-blue-700 p-1 rounded-full mr-2"></span>
            Personal Notes
          </div>
          <p className="text-sm text-gray-700 dark:text-[#ccc7c7] whitespace-pre-line">
            {job.notes || "No notes added"}
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-gray-100 dark:bg-[#33302f] p-5 rounded-2xl shadow-sm">
          <h3 className="text-lg font-semibold mb-3 dark:text-[#dc9079] ">
            Materials & Attachments
          </h3>

          {job.resume?.url && (
            <div className="flex items-center justify-between bg-white dark:bg-[#4a4645] rounded-xl p-3 shadow-sm border dark:border-[#635956] mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-red-100 p-2 rounded-lg">
                  <FileText className="text-red-500" size={20} />
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-800 truncate max-w-[150px]">
                    {job.resume.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-[#ccc7c7]">
                    Added{" "}
                    {job.resume.addedDate
                      ? new Date(job.resume.addedDate).toLocaleDateString()
                      : "Unknown date"}
                  </p>
                </div>
              </div>
              <a
                href={job.resume.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 dark:text-[#ccc7c7] hover:text-black"
              >
                <Download size={18} />
              </a>
            </div>
          )}
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 flex flex-col items-center justify-center text-gray-400 hover:border-gray-400 transition cursor-pointer">
            <div className="bg-gray-100 rounded-full p-2 mb-2">
              <Upload size={18} />
            </div>

            <p className="text-sm font-medium">Upload New Attachment</p>
          </div>
        </div>

        
          <FollowUpCard
            key={job.followUpDate}
            job={job}
            onMarkDone={() => handleMarkDone(job._id)}
            onReschedule={() => setShowReschedule(true)}
          />
        

        {/* Quick Actions */}
        <div className="bg-amber-600/10 border border-amber-600/20 p-5 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold mb-3 uppercase dark:text-[#dc9079]">
            Quick Actions
          </h3>

          <div className="flex flex-col gap-2">
            <button
              onClick={() => setShowDrawer(true)}
              className="px-3 py-2 border dark:border-[#635956] rounded-sm dark:text-[#cccccc] bg-white dark:bg-[#33302f] hover:bg-gray-100 text-sm flex items-center gap-2 justify-center font-bold cursor-pointer hover:scale-101 transition"
            >
              <MdEdit size={16} />
              Edit Job Details
            </button>

          </div>
        </div>
      </div>
      {showReschedule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">

          {/* BACKDROP */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => {
              setShowReschedule(false)
              setSelectedDate(null)
            }}
          />

          {/* MODAL */}
          <div
            className="
              relative w-[90%] max-w-sm p-5 rounded-2xl
              bg-white dark:bg-[#1f1f1f]
              shadow-2xl border border-white/10
              animate-popup
            "
          >

            {/* TITLE */}
            <h3
              className="
                text-sm font-semibold mb-2
                text-gray-800 dark:text-white
              "
            >
              {job.followUpDate
                ? "Reschedule Follow-up"
                : "Add Follow-up"}
            </h3>

            {/* DESCRIPTION */}
            <p
              className="
                text-xs text-gray-500
                dark:text-gray-400 mb-4
              "
            >
              {job.followUpDate
                ? "Choose a new follow-up date."
                : "Schedule your next follow-up reminder."}
            </p>

            {/* DATE INPUT */}
            <input
              type="date"
              value={selectedDate || ""}
              onChange={(e) =>
                setSelectedDate(e.target.value)
              }
              className="
                w-full p-2.5 rounded-xl border
                bg-white dark:bg-[#2a2a2a]
                dark:text-white
                border-gray-200 dark:border-white/10
                focus:outline-none
                focus:ring-2
                focus:ring-orange-500/30
              "
            />

            {/* ACTIONS */}
            <div className="flex justify-end gap-2 mt-5">

              <button
                onClick={() => {
                  setShowReschedule(false)
                  setSelectedDate(null)
                }}
                className="
                  px-3 py-1.5 rounded-lg
                  bg-gray-100 dark:bg-[#333]
                  text-gray-700 dark:text-gray-200
                  hover:bg-gray-200 dark:hover:bg-[#444]
                  transition
                "
              >
                Cancel
              </button>

              <button
                onClick={async () => {
                  await handleReschedule(selectedDate)

                  setShowReschedule(false)
                  setSelectedDate(null)
                }}
                className="
                  bg-orange-500 text-white
                  px-3 py-1.5 rounded-lg
                  hover:bg-orange-600
                  active:scale-95
                  transition-all duration-200
                "
              >
                {job.followUpDate
                  ? "Save Changes"
                  : "Add Follow-up"}
              </button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default JobDetailsMain
