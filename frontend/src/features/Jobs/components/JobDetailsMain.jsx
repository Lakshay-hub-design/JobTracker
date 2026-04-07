import React from 'react'
import { MdEdit } from "react-icons/md";
import { IoShareSocialSharp } from "react-icons/io5";
import { Download, FileText, Upload } from 'lucide-react';

const JobDetailsMain = ({ job }) => {
  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-2 space-y-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <div className="text-md font-semibold mb-3">
            <span className='bg-amber-800 p-1 rounded-full mr-2'></span>
            Job Description
            </div>
          <p className="text-sm text-gray-700 whitespace-pre-line">
            {job.description || "No description available"}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="text-md font-semibold mb-3">
            <span className='bg-amber-800 p-1 rounded-full mr-2'></span>
            Cover Letter
            </div>
          <p className="text-sm text-gray-700 bg-gray-100 p-2 rounded-2xl whitespace-pre-line">
            {job.coverLetter || "No cover letter added"}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="text-md font-semibold mb-3">
            <span className='bg-blue-700 p-1 rounded-full mr-2'></span>
            Personal Notes
            </div>
          <p className="text-sm text-gray-700 whitespace-pre-line">
            {job.notes || "No notes added"}
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-gray-100 p-5 rounded-2xl shadow-sm">
          <h3 className="text-lg font-semibold mb-3">Materials & Attachments</h3>

          {job.resume?.url && (
            <div className='flex items-center justify-between bg-white rounded-xl p-3 shadow-sm border mb-4'>
                <div className='flex items-center gap-3'>
                    <div className='bg-red-100 p-2 rounded-lg'>
                        <FileText className='text-red-500' size={20} />
                    </div>

                    <div>
                        <p className="text-sm font-medium text-gray-800 truncate max-w-[150px]">
                            {job.resume.name}
                        </p>
                        <p className='text-xs text-gray-500'>
                            Added {job.resume.addedDate ? new Date(job.resume.addedDate).toLocaleDateString() : "Unknown date"}
                        </p>
                    </div>
                </div>
                <a
                    href={job.resume.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-black"
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

        {/* Quick Actions */}
        <div className="bg-amber-600/10 border border-amber-600/20 p-5 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold mb-3 uppercase">Quick Actions</h3>

          <div className="flex flex-col gap-2">
            <button className="px-3 py-2 border rounded-sm bg-white hover:bg-gray-100 text-sm flex items-center gap-2 justify-center font-bold">
                <MdEdit size={16} />
              Edit Job Details
            </button>

            <button className="px-3 py-2 border rounded-lg hover:bg-gray-100 text-sm flex items-center gap-2 justify-center font-bold bg-white">
                <IoShareSocialSharp />
                Share Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobDetailsMain
