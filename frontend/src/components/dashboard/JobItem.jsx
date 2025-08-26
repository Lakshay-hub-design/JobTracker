import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaBuilding, FaRegCalendarAlt } from 'react-icons/fa';

const JobItem = React.memo(({ job }) => {
  const navigate = useNavigate();
  const getStatusColor = (status) => {
    switch (status) {
      case "applied": return "bg-blue-100 text-blue-700";
      case "interview": return "bg-green-100 text-green-700";
      case "offer": return "bg-yellow-100 text-yellow-700";
      default: return "bg-red-100 text-red-700";
    }
  };

  return (
    <motion.div
      onClick={() => navigate(`/jobs/${job._id}`)}
      whileHover={{ scale: 1.02 }}
      className="cursor-pointer hover:shadow-lg bg-gray-50 border rounded-lg p-4 shadow-sm flex flex-col gap-2 dark:bg-[#232b2b] dark:text-white"
    >
      <div className="flex justify-between items-center">
        <h4 className="text-lg font-semibold">{job.position}</h4>
        <span className={`px-2 py-1 text-xs rounded font-medium ${getStatusColor(job.status)}`}>
          {job.status}
        </span>
      </div>
      <div className="flex items-center text-gray-600 text-sm mt-1">
        <FaBuilding className="mr-1 text-gray-500" />
        {job.company}
      </div>
      <div className="flex items-center text-gray-500 text-xs mt-1">
        <FaRegCalendarAlt className="mr-1" />
        {new Date(job.createdAt).toLocaleDateString()}
      </div>
      <span className="w-auto text-center mt-2 text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-600 self-start">
        {job.jobType}
      </span>
    </motion.div>
  );
});

export default JobItem;
