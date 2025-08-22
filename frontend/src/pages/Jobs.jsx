import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContex";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useTheme } from "../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Building2,
  Calendar,
  FileText,
  Edit,
  Trash2,
  Briefcase,
  ChevronDown,
  ChevronUp, Pencil
} from "lucide-react";
import EditJob from "./EditJob";

const Jobs = () => {
  const { user, token, logout } = useAuth();
  const [jobs, setJobs] = useState([]);
  const { darkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [expandedJobId, setExpandedJobId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);
  

  const handleOpenModal = (jobId) => {
    setIsModalOpen(true);
    setSelectedJobId(jobId);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };


  const fetchJobs = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/jobs`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setJobs(res.data.jobs || []);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setJobs([]);
      }
    };

  useEffect(() => {
    fetchJobs();
  }, [token]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    try {
      await axios.delete(`${process.env.REACT_APP_BASE_URL}/jobs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs(jobs.filter((job) => job._id !== id));
    } catch (err) {
      console.error("Error deleting job:", err);
    }
  };

  // 🎨 Status Badge Colors
  const statusColors = {
    pending: "bg-yellow-100 text-yellow-700",
    interview: "bg-blue-100 text-blue-700",
    rejected: "bg-red-100 text-red-700",
    accepted: "bg-green-100 text-green-700",
  };

  const toggleExpand = (id) => {
    setExpandedJobId(expandedJobId === id ? null : id);
  };

  return (
    <>
      <Navbar darkMode={darkMode} toggleTheme={toggleTheme} logout={logout} />
      <div className="min-h-screen bg-gray-100 p-6 dark:bg-black dark:text-white">
        <h1 className="text-3xl font-bold mb-6">📋 My Job Applications</h1>

        {jobs.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">
            No jobs found. Start by adding one!
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job, index) => (
              <motion.div
                key={job._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-[#1e1e1e] shadow-lg rounded-xl p-5 hover:shadow-2xl transition self-start"
              >
                {/* Header (always visible) */}
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleExpand(job._id)}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="text-blue-500" size={20} />
                      <h2 className="text-lg font-semibold">{job.position}</h2>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                      <Building2 size={18} /> {job.company}
                    </div>
                  </div>
                  {expandedJobId === job._id ? <ChevronUp /> : <ChevronDown />}
                </div>

                {/* Expandable Details */}
                <AnimatePresence>
                  {expandedJobId === job._id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-3 space-y-3 text-sm text-gray-700 dark:text-gray-300 overflow-hidden"

                    >
                      {/* Status */}
                      <div>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            statusColors[job.status?.toLowerCase()] ||
                            "bg-gray-200 text-gray-700"
                          }`}
                        >
                          {job.status || "Unknown"}
                        </span>
                      </div>

                      {/* Applied Date */}
                      <div className="flex items-center gap-2">
                        <Calendar size={18} />
                        {job.appliedDate
                          ? new Date(job.appliedDate).toLocaleDateString()
                          : "N/A"}
                      </div>

                      {/* Follow-up Date */}
                      {job.followUpDate && (
                        <div className="flex items-center gap-2">
                          <Calendar size={18} />
                          Follow-up:{" "}
                          {new Date(job.followUpDate).toLocaleDateString()}
                        </div>
                      )}

                      {/* Notes */}
                      {job.notes && (
                        <p>
                          <span className="font-semibold">Notes:</span>{" "}
                          {job.notes}
                        </p>
                      )}

                      {/* Description */}
                      {job.description && (
                        <p>
                          <span className="font-semibold">Description:</span>{" "}
                          {job.description}
                        </p>
                      )}

                      {/* Resume Link */}
                      {job.resumeUrl && (
                        <a
                          href={job.resumeUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-2 text-blue-500 hover:underline"
                        >
                          <FileText size={18} /> View Resume
                        </a>
                      )}

              {isModalOpen && (
                  <>
                    {/* Overlay */}
                    <div className="fixed inset-0 z-40" onClick={handleCloseModal}></div>
          
                    {/* Modal Content */}
                    <div className="fixed inset-0 flex items-center justify-center  z-50">
                      <div
                        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {/* Close Button */}
                        <button
                          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                          onClick={handleCloseModal}
                        >
                          ✖
                        </button>
          
                        {/* AddJob Component */}
                        <EditJob onClose={handleCloseModal} fetchJobs={fetchJobs} jobId={selectedJobId} />
                      </div>
                    </div>
                  </>
                )}

          {/* Edit & Delete */}
          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={() => handleOpenModal(job._id)}>
              <Pencil className="mr-2" size={16} /> Edit
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              <Trash2 className="mr-2" size={16} /> Delete
            </Button>
          </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </motion.div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Jobs;
