import React from 'react'
import NavBar from '../../components/dashboard/NavBar'
import { useJobs } from '../../context/JobContext'
import JobCard from '../../components/jobs/JobCard';
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from '../../context/ThemeContext';

const Jobs = () => {

const {jobs} = useJobs();
  const {theme, toggleTheme} = useTheme()

  return (
    <div className='dark:bg-[#000000] dark:text-white'>
      <NavBar theme={theme} toggleTheme={toggleTheme}/>
      <div className="min-h-screen bg-gray-100 p-6 dark:bg-[#000000] dark:text-white">
        <h1 className="text-3xl font-bold mb-6">📋 My Job Applications</h1>
        {jobs.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">
            No jobs found. Start by adding one!
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
            {jobs.map((job, index) => (
              <motion.div
                key={job._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-[#1E1E1E] dark:text-white shadow-lg rounded-xl p-5 hover:shadow-2xl transition self-start"
              >
              <JobCard
                key={job._id}
                job={job}
              />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Jobs