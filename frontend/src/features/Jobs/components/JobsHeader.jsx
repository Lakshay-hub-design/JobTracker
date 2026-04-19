import { useState } from "react";
import { Search } from "lucide-react";
import { FiFilter } from "react-icons/fi";

const JobsHeader = ({ jobs, filters, setFilters, search, setSearch }) => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="mb-4 relative md:flex justify-between items-center">
      <div className="mb-4">
        <h2 className="text-2xl md:text-3xl font-bold">My Jobs</h2>
        <p className="text-gray-700  dark:text-[#9B837C] mt-2">
          You have{" "}
          <span className="text-orange-700 font-semibold">
            {jobs.length} active applications
          </span>{" "}
          in your pipeline.
        </p>
      </div>
      
        <div className="relative flex  items-center gap-3">
          <div className="flex md:hidden items-center flex-1 border-2 dark:bg-[#2a2726] rounded-xl px-3 py-2">
            <Search size={16} className="text-gray-400" />

            <input
              type="text"
              placeholder="Search applications..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none text-sm ml-2 w-full text-white placeholder-gray-400"
            />
          </div>

          <button
            onClick={() => setShowFilters((prev) => !prev)}
            className="bg-[#f2f2f2] dark:bg-[#2a2726] p-2.5 rounded-xl"
          >
            <FiFilter className="dark:text-white" size={18} />
          </button>
          {showFilters && (
            <div className="absolute right-0 top-14 z-50 w-[260px]">
              <div
                className="
        dark:bg-[#1f1d1c]/85 backdrop-blur-xl
        border border-white/10
        rounded-2xl p-4 shadow-2xl
      "
              >
                {/* 🔥 STATUS FILTER */}
                <p className="text-xs dark:text-gray-400 mb-2 tracking-wide">
                  STATUS FILTER
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {["", "applied", "interviewing", "offered", "rejected"].map(
                    (status) => (
                      <button
                        key={status}
                        onClick={() => setFilters({ ...filters, status })}
                        className={`
                px-3 py-1 rounded-full text-xs capitalize
                transition
                ${
                  filters.status === status
                    ? "bg-orange-500 text-white"
                    : "dark:bg-[#2a2726] bg-[#ededed] dark:text-gray-300 hover:bg-[#d8d8d8] dark:hover:bg-[#333]"
                }
              `}
                      >
                        {status === "" ? "All" : status}
                      </button>
                    ),
                  )}
                </div>

                {/* 🔥 JOB TYPE FILTER */}
                <p className="text-xs dark:text-gray-400 mb-2 tracking-wide">
                  JOB TYPE FILTER
                </p>

                <div className="flex flex-wrap gap-2">
                  {["", "full-time", "part-time", "internship"].map((type) => (
                    <button
                      key={type}
                      onClick={() => setFilters({ ...filters, jobType: type })}
                      className={`
                px-3 py-1 rounded-full text-xs capitalize
                transition
                ${
                  filters.jobType === type
                    ? "bg-orange-500 text-white"
                    : "dark:bg-[#2a2726] bg-[#ededed] dark:text-gray-300 hover:bg-[#d8d8d8] dark:hover:bg-[#333]"
                }
              `}
                    >
                      {type === "" ? "All" : type}
                    </button>
                  ))}
                </div>

                <div className="flex justify-between mt-4 pt-3 border-t border-white/10">
                  <button
                    onClick={() =>
                      setFilters({ status: "", jobType: "", search: "" })
                    }
                    className="text-xs dark:text-gray-400 hover:text-[#5f5c5c] dark:hover:text-white"
                  >
                    Clear All
                  </button>

                  <button
                    onClick={() => setShowFilters(false)}
                    className="text-xs bg-orange-500 text-white dark:text-black px-3 py-1 rounded-full"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
    </div>
  );
};

export default JobsHeader;
