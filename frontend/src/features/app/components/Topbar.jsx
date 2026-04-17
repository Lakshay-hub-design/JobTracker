import React, { useContext, useState } from "react";
import { Search } from "lucide-react";
import { BiSolidBell } from "react-icons/bi";
import { AuthContext } from "../../auth/context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { JobContext } from "../../Jobs/context/JobContext";
import { useTheme } from "../context/ThemeContext";
import { IoSunnyOutline, IoMoonSharp } from "react-icons/io5"

const Topbar = () => {
  const [showNotifications, setShowNotifications] = useState(false);

  const context = useContext(AuthContext);
  const jobContext = useContext(JobContext);

  const { user } = context;
  const { search, setSearch, notifications } = jobContext;

  const { theme, toggleTheme } = useTheme()

  const location = useLocation();
  const navigate = useNavigate();

  const formatFollowUpDate = (dateString) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const date = new Date(dateString);
    date.setHours(0, 0, 0, 0);

    const diff = Math.ceil((date - today) / (1000 * 60 * 60 * 24));

    if (diff === 0) return "Today";
    if (diff === 1) return "Tomorrow";
    if (diff === -1) return "Yesterday";
    if (diff < 0) return `${Math.abs(diff)} days ago`;
    return `In ${diff} days`;
  };

  return (
    <div className="bg-white border-b dark:border-black px-5 py-2 flex dark:bg-[#151312] dark:text-gray-100  items-center justify-between">
      <div className="hidden md:block"></div>
      <div className=" md:hidden">
        <h1 className="font-semibold text-lg text-orange-500">JobTracker</h1>
      </div>
      {location.pathname === "/jobs" && (
        <div className="relative w-full max-w-md">
          {/* Icon */}
          <div className="absolute left-2 top-1/2 -translate-y-1/2 bg-orange-100 hover:bg-orange-200 transition p-2 rounded-full">
            <Search size={16} className="text-orange-600" />
          </div>

          {/* Input */}
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search jobs, company..."
            className="
          w-full 
          pl-12 pr-4 py-2.5 
          rounded-full 
          bg-white dark:bg-[#1D1B1A]
          border border-gray-200 dark:border-none
          text-sm 
          focus:outline-none 
          focus:ring-1 focus:ring-orange-500 
          focus:border-orange-500
          transition
        "
          />
        </div>
      )}
      <div className="flex items-center gap-3 md:gap-4">
        <button
          onClick={() => navigate("/job/new")}
          className=" hidden md:block bg-orange-600 text-white px-4 py-2 hover:scale-105 transition cursor-pointer active:scale-95 rounded-full shadow-lg"
        >
          + Add Job
        </button>
        <button className="hidden md:block" onClick={toggleTheme}>
          {theme === "dark" ? <IoMoonSharp /> : <IoSunnyOutline />}
        </button>
        <div className="relative">
          <button onClick={() => setShowNotifications(true)}>
            <BiSolidBell className="text-gray-600 dark:text-[#94A3B8] cursor-pointer" size={20} />
          </button>
          {notifications.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
              {notifications.length}
            </span>
          )}

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-[380px] max-h-[500px] bg-white dark:bg-[#2e2929] rounded-2xl shadow-2xl border border-gray-100 dark:border-[#484242] z-50 overflow-hidden animate-fadeIn flex flex-col">
              {/* HEADER */}
              <div className="p-4 border-b dark:border-[#413d3d] flex justify-between items-center">
                <h2 className="text-sm font-semibold text-gray-800 dark:text-[#ad8383]">
                  Notifications
                </h2>

                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-gray-400 hover:text-black transition"
                >
                  ✕
                </button>
              </div>

              {/* CONTENT */}
              <div className="flex-1 overflow-y-auto p-3 space-y-5">
                {notifications.length === 0 ? (
                  <div className="text-center py-12 text-gray-500 text-sm">
                    🎉 You're all caught up!
                  </div>
                ) : (
                  <>
                    {/* 🔴 OVERDUE */}
                    {notifications.filter((n) => n.type === "overdue").length >
                      0 && (
                      <div>
                        <h3 className="text-[11px] font-semibold text-red-500 mb-2 uppercase tracking-widest">
                          Overdue
                        </h3>

                        <div className="space-y-2">
                          {notifications
                            .filter((n) => n.type === "overdue")
                            .map((item) => (
                              <div
                                key={item._id}
                                onClick={() => {
                                  navigate(`/job/${item.jobId}`);
                                  setShowNotifications(false);
                                }}
                                className="group flex items-start gap-3 p-3 rounded-xl bg-red-50 dark:bg-[#231e1e] border dark:border-[#4b4545] border-red-100 hover:shadow-sm transition cursor-pointer"
                              >
                                {/* ICON */}
                                <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 text-xs font-bold">
                                  !
                                </div>

                                {/* TEXT */}
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-gray-800 dark:text-[#c2afaf] truncate">
                                    {item.company}
                                  </p>
                                  <p className="text-xs text-gray-500 dark:text-[#beb7b7] truncate">
                                    {item.position}
                                  </p>
                                  <p className="text-xs text-red-500 mt-1">
                                    {formatFollowUpDate(item.followUpDate)}
                                  </p>
                                </div>

                                {/* BADGE */}
                                <span className="text-[10px] px-2 py-1 rounded-full bg-red-100 text-red-600 whitespace-nowrap">
                                  Overdue
                                </span>
                              </div>
                            ))}
                        </div>
                      </div>
                    )}

                    {/* 🔵 UPCOMING */}
                    {notifications.filter((n) => n.type === "upcoming").length >
                      0 && (
                      <div>
                        <h3 className="text-[11px] font-semibold text-gray-400 mb-2 uppercase tracking-widest">
                          Upcoming
                        </h3>

                        <div className="space-y-2">
                          {notifications
                            .filter((n) => n.type === "upcoming")
                            .map((item) => (
                              <div
                                key={item._id}
                                onClick={() => {
                                  navigate(`/job/${item.jobId}`);
                                  setShowNotifications(false);
                                }}
                                className="group flex items-start gap-3 p-3 rounded-xl bg-white dark:bg-[#231e1e] border dark:border-[#4b4545] hover:shadow-sm transition cursor-pointer"
                              >
                                {/* ICON */}
                                <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 text-xs">
                                  📅
                                </div>

                                {/* TEXT */}
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-gray-800 dark:text-[#c2afaf] truncate">
                                    {item.company}
                                  </p>
                                  <p className="text-xs text-gray-500 dark:text-[#beb7b7] truncate">
                                    {item.position}
                                  </p>
                                  <p className="text-xs text-gray-400 mt-1">
                                    {formatFollowUpDate(item.followUpDate)}
                                  </p>
                                </div>

                                {/* BADGE */}
                                <span className="text-[10px] px-2 py-1 rounded-full bg-blue-50 text-blue-600 whitespace-nowrap">
                                  Upcoming
                                </span>
                              </div>
                            ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="border dark:border-[#222222] h-8"></div>
        <div
        onClick={() => navigate('/settings')}
        className="w-8 h-8 bg-gray-300 rounded-full overflow-hidden hover:scale-105 transition cursor-pointer">
          <img
            src={user?.personalInfo?.profileImage?.url}
            className="object-cover w-full h-full"
            alt=""
          />
        </div>
        <h3 className="hidden md:block font-medium text-sm ">{user.username}</h3>
      </div>
    </div>
  );
};

export default Topbar;
