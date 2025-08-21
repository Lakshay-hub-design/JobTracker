import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useAuth } from "../context/AuthContex";
import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
} from "recharts";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaBuilding, FaSearch } from "react-icons/fa";
import { FaRegCalendarAlt } from "react-icons/fa";
import AddJob from "./AddJob";
import JobsBarChart from "../components/JobBarChart";
import { useTheme } from "../context/ThemeContext";
import { Sun, Moon } from "lucide-react";
import { toast } from "sonner";
import Navbar from "../components/Navbar";


/** ---------- Memoized UI Bits ---------- */
const StatCard = React.memo(function StatCard({ label, value, color }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className={`${color} text-white p-4 rounded-lg shadow-md text-center`}
    >
      <p className="text-sm sm:text-lg font-semibold">{label}</p>
      <motion.p
        className="text-xl sm:text-2xl font-bold"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {value}
      </motion.p>
    </motion.div>
  );
});

const JobItem = React.memo(function JobItem({ job }) {
  const navigate = useNavigate();
  return (
    <motion.div
      key={job._id}
      onClick={() => navigate(`/jobs/${job._id}`)}
      whileHover={{ scale: 1.02 }}
      className="cursor-pointer hover:shadow-lg bg-gray-50 border rounded-lg p-4 shadow-sm flex flex-col gap-2 dark:bg-[#232b2b] dark:text-white"
    >
      <div className="flex justify-between items-center">
        <h4 className="text-lg font-semibold">{job.position}</h4>
        <span
          className={`px-2 py-1 text-xs rounded font-medium ${
            job.status === "applied"
              ? "bg-blue-100 text-blue-700"
              : job.status === "interview"
              ? "bg-green-100 text-green-700"
              : job.status === "offer"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700"
          }`}
        >
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

              <span className="w-[80  px] text-center mt-2 text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-600">
                {job.jobType}
              </span>
    </motion.div>
  );
});


/** ---------- Page ---------- */
const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const { darkMode, toggleTheme } = useTheme();

  // fetch once (memoized reference)
  const fetchJobs = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:4000/api/jobs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      // support both [{}, {}] and { jobs: [] }
      const data = Array.isArray(res.data?.jobs) ? res.data.jobs : res.data;
      setJobs(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching jobs", error);
      setJobs([]); // fail-safe
    }
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  // Calculate stats (useMemo for optimization)

  const stats = useMemo(() => {
    const applied = jobs.filter((j) => j.status === "applied").length;
    const interview = jobs.filter((j) => j.status === "interview").length;
    const offer = jobs.filter((j) => j.status === "offer").length;
    const rejected = jobs.filter((j) => j.status === "rejected").length;

    return {
      total: jobs.length,
      applied,
      interview,
      offer,
      rejected,
    };
  }, [jobs]);

const chartData = useMemo(
  () => [
    { name: "Applied", value: stats.applied },
    { name: "Interview", value: stats.interview },
    { name: "Offer", value: stats.offer },
    { name: "Rejected", value: stats.rejected },
  ],
  [stats]
);

const COLORS = ["#4A90E2", "#50C878", "#FBC02D", "#FF4D4D"];

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        job.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = typeFilter ? job.jobType === typeFilter : true;
      const matchesStatus = statusFilter ? job.status === statusFilter : true;
      return matchesSearch && matchesType && matchesStatus;
    });
  }, [jobs, searchTerm, typeFilter, statusFilter]);

  const jobsByMonth = jobs.reduce((acc, job) => {
  const month = new Date(job.createdAt).toLocaleString("default", { month: "short" });
  acc[month] = (acc[month] || 0) + 1;
  return acc;
}, {});

const barChartData = Object.entries(jobsByMonth).map(([month, count]) => ({
  month,
  count,
}));

  const upcomingFollowUps = useMemo(() => {
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);

    return jobs.filter((job) => {
      if (!job.followUpDate) return false;
      const date = new Date(job.followUpDate);
      return date >= today && date <= nextWeek;
    });
  }, [jobs]);



  return (
    <>
    <Navbar
        user={user}
        toggleTheme={toggleTheme}
        darkMode={darkMode}
        handleOpenModal={handleOpenModal}
        logout={logout}
      />
    <div className="p-4 sm:p-6">
      {/* Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-6"
      >
        <StatCard label="Total Jobs" value={stats.total} color="bg-blue-500" />
        <StatCard label="Applied" value={stats.applied} color="bg-indigo-500" />
        <StatCard
          label="Interview"
          value={stats.interview}
          color="bg-green-500"
        />
        <StatCard label="Offer" value={stats.offer} color="bg-yellow-500" />
        <StatCard label="Rejected" value={stats.rejected} color="bg-red-500" />
      </motion.div>

      {/* Main Content (kept your layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
        {/* Recent Jobs */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="bg-white p-4 rounded-lg shadow-md dark:bg-[#0e1111] dark:text-white"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Recent Jobs</h3>
            <button
              onClick={() => navigate("/jobs")}
              className="text-sm text-blue-600 hover:underline"
            >
              View All
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="relative flex-1">
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search by title or company"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 rounded-lg pl-10 pr-4 py-2 w-full focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none dark:bg-[#0e1111] dark:text-white"
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
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none dark:bg-[#0e1111] dark:text-white"
            >
              <option value="">All Status</option>
              <option value="applied">Applied</option>
              <option value="interview">Interview</option>
              <option value="offer">Offer</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          {filteredJobs.length === 0 ? (
            <div className="text-gray-500">No matching jobs.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
              {filteredJobs.slice(0, 6).map((job) => (
                <JobItem key={job._id} job={job} />
              ))}
            </div>
          )}

          {jobs.length === 0 && (
            <div className="text-gray-500 ">
              No jobs added yet.{" "}
              <button
                onClick={() => navigate("/add-job")}
                className="text-blue-600 hover:underline"
              >
                Add one now
              </button>
              .
            </div>
          )}
        </motion.div>

        {/* Chart */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="bg-white p-4 rounded-lg shadow-md dark:bg-[#0e1111] dark:text-white"
        >
          <div className="bg-white p-4 rounded-lg shadow-md mb-6 dark:bg-[#0e1111] dark:text-white">
          <h3 className="text-lg font-bold mb-4">Upcoming Follow-ups</h3>

          {upcomingFollowUps.length === 0 ? (
            <p className="text-gray-500 text-sm">
              No follow-ups in the next 7 days.
            </p>
          ) : (
            <ul className="space-y-3">
              {upcomingFollowUps.map((job) => (
                <li
                  key={job._id}
                  className="border p-3 rounded-lg hover:bg-gray-50 transition dark:border-gray-700 dark:hover:bg-[#232b2b]"
                >
                  <p className="font-semibold">{job.position}</p>
                  <p className="text-sm text-gray-600">{job.company}</p>
                  <p className="text-xs text-gray-500">
                    Follow-up: {new Date(job.followUpDate).toLocaleDateString()}
                  </p>
                </li>
              ))}
            </ul>
          )}
          </div>
          <h3 className="text-lg font-bold mb-4">Job Status Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
          <JobsBarChart data={barChartData} />
        </motion.div>

        {/* Follow-ups Section */}
      </div>

      {/* Floating Add Button (mobile-friendly quick action) */}
      <button
        onClick={handleOpenModal}
        className="fixed bottom-6 right-6 sm:hidden rounded-full w-14 h-14 bg-blue-600 text-white text-2xl shadow-lg hover:bg-blue-700"
        aria-label="Add Job"
      >
        +
      </button>
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
              <AddJob onClose={handleCloseModal} onAddJob={fetchJobs} />
            </div>
          </div>
        </>
      )}
    </div>
    </>
  );
};

export default Dashboard;
