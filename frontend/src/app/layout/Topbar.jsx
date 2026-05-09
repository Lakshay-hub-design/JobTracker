import React, { useContext, useState } from "react";
import { Search } from "lucide-react";
import { HiOutlineBellAlert } from "react-icons/hi2";
import { AuthContext } from "../../features/auth/context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { JobContext } from "../../features/Jobs/context/JobContext";
import { useTheme } from "../providers/ThemeContext";
import { IoSunnyOutline, IoMoonSharp } from "react-icons/io5";
import { useJobs } from "../../features/Jobs/hooks/useJob";
import { Check } from "lucide-react";

const Topbar = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [confirmId, setConfirmId] = useState(null);

  const context = useContext(AuthContext);
  const jobContext = useContext(JobContext);

  const { user } = context;
  const { search, setSearch, notifications } = jobContext;
  const { theme, toggleTheme } = useTheme();
  const { handleMarkDone } = useJobs();

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

  const Section = ({ title, color, items }) => {
    const isRed = color === "red";

    return (
      <div>
        <h3
          className={`text-[11px] font-semibold mb-3 uppercase tracking-widest
        ${isRed ? "text-red-400" : "text-gray-400"}`}
        >
          {title}
        </h3>

        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item._id}
              onClick={() => {
                navigate(`/job/${item.jobId}`);
                setShowNotifications(false);
              }}
              className={`group flex items-start gap-3 p-3 rounded-xl cursor-pointer
              backdrop-blur-md bg-white/40 dark:bg-white/5
              border border-white/20 dark:border-white/10
              hover:scale-[1.02] hover:shadow-lg transition-all duration-200`}
            >
              <div
                className={`h-9 w-9 rounded-full flex items-center justify-center text-xs font-bold
              ${
                isRed ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"
              }`}
              >
                {isRed ? "!" : "📅"}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 dark:text-white truncate">
                  {item.company}
                </p>

                <p className="text-xs text-gray-500 dark:text-gray-300 truncate">
                  {item.position}
                </p>

                <p
                  className={`text-xs mt-1 ${
                    isRed ? "text-red-400" : "text-gray-400"
                  }`}
                >
                  {formatFollowUpDate(item.followUpDate)}
                </p>
              </div>

              <div className="flex flex-col items-end gap-2">
                <span
                  className={`text-[10px] px-2 py-1 rounded-full whitespace-nowrap
      ${isRed ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"}`}
                >
                  {title}
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();

                    setConfirmId(item.jobId)
                  }}
                  className="
      flex items-center gap-1
      text-[11px] px-2.5 py-1.5
      rounded-full
      bg-green-100 text-green-700
      hover:bg-green-200
      active:scale-95
      transition
      font-medium
    "
                >
                  <Check size={12} />
                  Done
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white border-b dark:border-black px-5 py-2 flex dark:bg-[#151312] dark:text-gray-100  items-center justify-between">
      <div className="hidden md:block"></div>
      <div className=" md:hidden">
        <h1 className="font-semibold text-lg text-orange-500">JobTracker</h1>
      </div>
      {location.pathname === "/jobs" && (
        <div className="hidden md:block relative w-full max-w-md">
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
          {theme === "dark" ?  <IoSunnyOutline /> : <IoMoonSharp /> }
        </button>
        <div className="relative">
          <button onClick={() => setShowNotifications(true)}>
            <HiOutlineBellAlert
              className="text-gray-600 dark:text-[#94A3B8] cursor-pointer"
              size={22}
            />
          </button>
          {notifications.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
              {notifications.length}
            </span>
          )}

          {showNotifications && (
            <>
              {/* BACKDROP (only mobile) */}
              <div
                className="fixed inset-0 bg-black/40 z-40 sm:hidden"
                onClick={() => setShowNotifications(false)}
              />

              {/* ================== DESKTOP ================== */}
              <div
                className="hidden sm:block absolute right-0 mt-3 w-[380px] z-50
      animate-popup"
              >
                <div
                  className="
        backdrop-blur-xl bg-white/80 dark:bg-[#1f1f1f]/80
        border border-white/20 dark:border-white/10
        rounded-2xl shadow-2xl overflow-hidden flex flex-col
      "
                >
                  {/* HEADER */}
                  <div className="p-4 flex justify-between items-center border-b border-white/20">
                    <h2 className="text-sm font-semibold text-gray-800 dark:text-white">
                      Notifications
                    </h2>

                    <button onClick={() => setShowNotifications(false)}>
                      ✕
                    </button>
                  </div>

                  {/* CONTENT */}
                  <div className="max-h-[400px] overflow-y-auto p-3 space-y-6">
                    {notifications.length === 0 ? (
                      <div className="text-center py-10 text-gray-500 text-sm">
                        🎉 You're all caught up!
                      </div>
                    ) : (
                      <>
                        {notifications.some((n) => n.type === "overdue") && (
                          <Section
                            title="Overdue"
                            color="red"
                            items={notifications.filter(
                              (n) => n.type === "overdue",
                            )}
                          />
                        )}

                        {notifications.some((n) => n.type === "upcoming") && (
                          <Section
                            title="Upcoming"
                            color="blue"
                            items={notifications.filter(
                              (n) => n.type === "upcoming",
                            )}
                          />
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* ================== MOBILE ================== */}
              <div className="fixed inset-x-0 bottom-0 z-50 sm:hidden">
                <div
                  className="
        w-full 
        h-[30vh]
        
        rounded-t-3xl
        backdrop-blur-xl bg-white/90 dark:bg-[#1f1f1f]/90
        border border-white/20 dark:border-white/10
        shadow-2xl flex flex-col
        animate-slideUp
      "
                >
                  {/* DRAG HANDLE */}
                  <div className="flex justify-center py-2">
                    <div className="w-10 h-1.5 bg-gray-300 rounded-full" />
                  </div>

                  {/* HEADER */}
                  <div className="p-4 flex justify-between items-center border-b border-white/20">
                    <h2 className="text-sm font-semibold text-gray-800 dark:text-white">
                      Notifications
                    </h2>

                    <button onClick={() => setShowNotifications(false)}>
                      ✕
                    </button>
                  </div>

                  {/* CONTENT */}
                  <div className="flex-1 overflow-y-auto p-3 space-y-7">
                    {notifications.length === 0 ? (
                      <div className="text-center py-10 text-gray-500 text-sm">
                        🎉 You're all caught up!
                      </div>
                    ) : (
                      <>
                        {notifications.some((n) => n.type === "overdue") && (
                          <Section
                            title="Overdue"
                            color="red"
                            items={notifications.filter(
                              (n) => n.type === "overdue",
                            )}
                          />
                        )}

                        {notifications.some((n) => n.type === "upcoming") && (
                          <Section
                            title="Upcoming"
                            color="blue"
                            items={notifications.filter(
                              (n) => n.type === "upcoming",
                            )}
                          />
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="border dark:border-[#222222] h-8"></div>
        <div
          onClick={() => navigate("/settings")}
          className="w-8 h-8 bg-gray-300 rounded-full overflow-hidden hover:scale-105 transition cursor-pointer"
        >
          <img
            src={user?.personalInfo?.profileImage?.url}
            className="object-cover w-full h-full"
            alt=""
          />
        </div>
        <h3 className="hidden md:block font-medium text-sm ">
          {user.name}
        </h3>
      </div>
      {confirmId && (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    
    {/* BACKDROP */}
    <div
      className="absolute inset-0 bg-black/40"
      onClick={() => setConfirmId(null)}
    />

    {/* MODAL */}
    <div className="
      relative w-[90%] max-w-sm
      backdrop-blur-xl bg-white/90 dark:bg-[#1f1f1f]/90
      border border-white/20
      rounded-2xl shadow-2xl p-5
      animate-popup
    ">
      <h3 className="text-sm font-semibold mb-2 text-gray-800 dark:text-white">
        Mark as done?
      </h3>

      <p className="text-xs text-gray-500 mb-4">
        This follow-up will be removed from your notifications.
      </p>

      <div className="flex justify-end gap-2">
        <button
          onClick={() => setConfirmId(null)}
          className="px-3 py-1.5 text-sm rounded-lg bg-gray-100 dark:text-black hover:bg-gray-200"
        >
          Cancel
        </button>

        <button
          onClick={async () => {
            await handleMarkDone(confirmId);
            setConfirmId(null);
          }}
          className="px-3 py-1.5 text-sm rounded-lg bg-green-500 text-white hover:bg-green-600"
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default Topbar;
