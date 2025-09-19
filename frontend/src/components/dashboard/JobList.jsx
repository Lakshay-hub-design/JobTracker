import { Search, Briefcase, Calendar } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function JobsList({jobs}) {

  const [searchTerm, setSearchTerm] = useState("");
  const [jobTypeFilter, setJobTypeFilter] = useState("All Types");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const navigate = useNavigate();

  const filteredJobs = jobs.filter((job) => {
    // Search check (case-insensitive)
    const matchesSearch =
      job.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase());

    // Job Type filter
    const matchesJobType =
      jobTypeFilter === "All Types" || job.jobType === jobTypeFilter;

    // Status filter
    const matchesStatus =
      statusFilter === "All Status" || job.status === statusFilter;

    return matchesSearch && matchesJobType && matchesStatus;
  });


  return (
    <div className=" text-black dark:bg-[#111] dark:text-white rounded-xl p-6 shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Recent Jobs</h2>
        <button onClick={() => navigate('/jobs')} className="text-blue-400 hover:underline">View All</button>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-wrap gap-3 mb-5">
        <div className="flex items-center sm:flex-row bg-gray-100 dark:bg-[#232B2B] z-0 px-3 py-2 rounded-lg flex-1 min-w-[200px]">
          <Search size={18} className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search by title or company"
            className="bg-transparent outline-none flex-1 text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select className="px-4 py-2 bg-gray-100 dark:bg-[#232B2B] rounded-lg text-sm"
          value={jobTypeFilter}
          onChange={(e) => setJobTypeFilter(e.target.value)}
        >
          <option value='All Types'>All Types</option>
          <option value='full-time'>Full-time</option>
          <option value='part-time'>Part-time</option>
          <option value='remote'>Remote</option>
          <option value="internship">Internship</option>
        </select>
        <select className="px-4 py-2 bg-gray-100 dark:bg-[#232B2B] rounded-lg text-sm"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value='All Status'>All Status</option>
          <option value='applied'>Applied</option>
          <option value='interview'>Interview</option>
          <option value='offer'>Offer</option>
          <option value='rejected'>Rejected</option>
        </select>
      </div>

      {/* Job Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredJobs.length === 0 ? (
          <p className="text-gray-400">No jobs found</p>
        ) : (
        filteredJobs.slice(0,4).map((job) => (
          <div
            key={job._id}
            onClick={() => navigate(`/jobs/${job._id}`)}
            className="p-4 rounded-lg shadow flex flex-col cursor-pointer dark:bg-[#232B2B] hover:bg-gray-200 transition"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">{job.position}</h3>
              <span
                className={`text-xs px-2 py-1 rounded ${
                  job.status === "applied"
                    ? "bg-blue-100 text-blue-700"
                    : job.status === "offer"
                    ? "bg-yellow-100 text-yellow-700"
                    : job.status === "interview"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {job.status}
              </span>
            </div>
            <div className="text-sm text-gray-500 flex items-center gap-2">
              <Briefcase size={14} /> {job.company}
            </div>
            <div className="text-sm text-gray-500 flex items-center gap-2 mt-1">
              <Calendar size={14} /> { new Date(job.createdAt).toLocaleDateString() }
            </div>
            <div className="mt-3">
              <span className="text-xs px-3 py-1 rounded-full bg-blue-500/20 text-blue-400">
                {job.jobType}
              </span>
            </div>
          </div>
        )))}
      </div>
    </div>
  );
}
