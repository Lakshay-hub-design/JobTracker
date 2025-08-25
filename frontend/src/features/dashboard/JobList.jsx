import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import JobItem from '../../components/JobItem'; // Assuming this is in your components folder
import { FaSearch } from 'react-icons/fa';

// This component now takes all the filter state and setters directly
const JobList = ({
  jobs,
  isLoading,
  searchTerm,
  setSearchTerm,
  typeFilter,
  setTypeFilter,
  statusFilter,
  setStatusFilter,
}) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="bg-white p-4 rounded-lg shadow-md dark:bg-[#171717]"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">Recent Jobs</h3>
        <button
          onClick={() => navigate("/jobs")}
          className="text-sm text-blue-600 hover:underline"
        >
          View All
        </button>
      </div>

      {/* Filtering UI is now directly inside this component */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search by title or company"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-lg pl-10 pr-4 py-2 w-full focus:ring-2 focus:ring-blue-500 outline-none dark:bg-[#232b2b] dark:text-white"
          />
        </div>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none dark:bg-[#232b2b] dark:text-white"
        >
          <option value="">All Types</option>
          <option value="full-time">Full-time</option>
          <option value="part-time">Part-time</option>
          <option value="internship">Internship</option>
          <option value="remote">Remote</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none dark:bg-[#232b2b] dark:text-white"
        >
          <option value="">All Status</option>
          <option value="applied">Applied</option>
          <option value="interview">Interview</option>
          <option value="offer">Offer</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* Job List Rendering */}
      {isLoading ? (
        <div className="text-gray-500">Loading jobs...</div>
      ) : jobs.length === 0 ? (
        <div className="text-gray-500">No matching jobs found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {jobs.slice(0, 4).map((job) => (
            <JobItem key={job._id} job={job} />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default JobList;
