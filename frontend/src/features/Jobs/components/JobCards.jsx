import { ArrowRight, Calendar1, MapPin } from 'lucide-react'
import { useNavigate } from 'react-router-dom';
import { MdDeleteForever } from "react-icons/md";
import React from 'react';

const statusColor = {
    applied: "bg-gray-200 text-gray-700",
    interviewing: "bg-orange-100 text-orange-600",
    offered: "bg-green-100 text-green-600",
    rejected: "bg-red-100 text-red-600"
}

const cardColors = [
  "bg-pink-100",
  "bg-purple-100",
  "bg-blue-100",
  "bg-green-100",
  "bg-yellow-100",
  "bg-orange-100",
];

const getColorById = (id) => {
  let hash = 0;

  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }

  const index = Math.abs(hash) % cardColors.length;
  return cardColors[index];
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

const JobCards = ({ job, onDelete }) => {
    const navigate = useNavigate()
    const bgColor = getColorById(job._id);

  return (
    <div className="bg-white dark:bg-[#221F1E] p-2 h-full rounded-2xl shadow-sm hover:shadow-md transition flex flex-col">
      <div className={`rounded-2xl p-5 ${bgColor} flex flex-col flex-1`}>
        <div className=" flex justify-between items-center mb-3">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
            <span className="text-sm font-bold">🏢</span>
          </div>
          <span
            className={`px-3 py-1 text-xs rounded-full ${statusColor[job.status]}`}
          >
            {job.status}
          </span>
        </div>

        <div className="mt-2">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            {job.position}
          </h2>
          <p className="text-sm text-orange-900 font-medium capitalize mb-6">
            {job.company}
          </p>
        </div>

        <div className="flex justify-between gap-2 mt-auto">
          <div className="flex items-center w-2/5 text-orange-900">
            <Calendar1 size={16} />
            <p className="text-xs truncate text-gray-500 ml-2">
              {formatDate(job.appliedDate)}
            </p>
          </div>
          <div className="flex items-center w-3/5 text-orange-900">
            <MapPin size={16} />
            <p className="text-xs truncate text-gray-500 ml-2">{job.location}</p>
          </div>
        </div>
      </div>
      <div className='flex items-center gap-2 mt-2'>
        <button onClick={() => navigate(`/job/${job._id}`)} className="flex items-center justify-center px-4 py-2 bg-orange-600 w-full  rounded-full text-white font-semibold cursor-pointer active:scale-95 transition">
        Details
        <ArrowRight size={16} className="ml-2" />
      </button>
      <button 
      onClick={() => onDelete(job._id)}
      className='px-4 py-2 bg-gray-200 rounded-full font-semibold cursor-pointer active:scale-95 transition'>
        <MdDeleteForever size={22} className='text-red-500' />
      </button>
      </div>
    </div>
  );
}

export default React.memo(JobCards)
