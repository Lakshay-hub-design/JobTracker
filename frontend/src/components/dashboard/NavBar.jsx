import React, { useEffect, useState } from "react";
import {
  LayoutGrid,
  List,
  User,
  Plus,
  Bell,
  Sun,
  Moon,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import AddJobForm from "../features/AddJob";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import FollowUpBell from "../navbar/FollowUpBell";
import { useJobs } from "../../context/JobContext";

const NavBar = ({theme, toggleTheme}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onDashboard = location.pathname === "/dashboard";
  const navigate = useNavigate();
  const { upcomingFollowUps } = useJobs()

  const NavLink = ({ to, icon: Icon, children, onClick }) => {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
      <button
        onClick={onClick}
        className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
          isActive
            ? "text-primary bg-primary/10 dark:bg-[#202020] dark:text-[#E5E5E5]"
            : "text-[#928b8b] hover:text-foreground hover:bg-muted/50 hover:dark:bg-[#181818] hover:dark:text-white "
        }`}
      >
        <Icon size={18} />
        {children}
      </button>
    );
  };

  const MobileLink = ({ to, icon: Icon, children, onClick }) => {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
      <button
        onClick={onClick}
        className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors w-16  ${
          isActive ? "text-primary dark:text-white" : "text-muted-foreground hover:text-primary "
        }`}
      >
        <Icon size={22} />
        <span className="text-xs font-medium">{children}</span>
      </button>
    );
  };

  const logout = async () => {
    try {
      await axios.get("http://localhost:3000/api/auth/user/logout", {
        withCredentials: true,
      });
      navigate("/user/login");
    } catch (err) {
      console.error("Logout failed:", err.response?.data || err.message);
    }
  };

  return (
    <>
      {/* --- DESKTOP NAVIGATION (Visible on md screens and up) --- */}
      <motion.nav className="sticky top-0 z-50 hidden w-full border-b dark:border-[#262626] bg-background/95 dark:bg-[#0B0B0B] dark:text-white backdrop-blur-sm md:block">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          {/* Left - Logo + Nav Links */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-2"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground dark:bg-[#E5E5E5] dark:text-black">
                <LayoutDashboard size={20} />
              </div>
              <h1 className="text-xl font-bold tracking-wide text-foreground dark:text-white">
                JobTracker
              </h1>
            </button>
            {/* Centered navigation links for desktop */}
            <div className="flex items-center gap-2">
              <NavLink
                to="/dashboard"
                icon={LayoutDashboard}
                onClick={() => navigate("/dashboard")}
              >
                Tracker
              </NavLink>
              <NavLink to="/jobs" icon={List} onClick={() => navigate("/jobs")}>
                Jobs
              </NavLink>
              <NavLink
                to="/profile"
                icon={User}
                onClick={() => navigate("/profile")}
              >
                Profile
              </NavLink>
            </div>
          </div>

          {/* Right - Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow transition-transform dark:bg-[#E5E5E5] dark:text-black hover:scale-105"
            >
              <Plus size={18} /> Add Job
            </button>
            <FollowUpBell className="h-5 w-5"  followUps={upcomingFollowUps}/>
            <button
              onClick={toggleTheme}
              className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground hover:dark:bg-[#181818] hover:dark:text-white"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={theme}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                </motion.div>
              </AnimatePresence>
            </button>
            <button
              onClick={logout}
              className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground hover:dark:bg-[#181818] hover:dark:text-white"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* --- MOBILE NAVIGATION (Visible on screens smaller than md) --- */}
      <div className="block md:hidden sticky top-0">
        {/* Top bar for mobile (logo and theme toggle) */}
        <div className="z-50 flex h-14 items-center justify-between border-b dark:border-[#262626] px-4 backdrop-blur-sm">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground dark:bg-[#E5E5E5] dark:text-black">
              <LayoutDashboard size={20} />
            </div>
            <h1 className="text-lg font-bold dark:text-white ">JobTracker</h1>
          </button>
          <div className="flex">
            <FollowUpBell />
            <button
              onClick={toggleTheme}
              className="rounded-full p-2 ml-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>

        {/* Floating Action Button for "Add Job" */}
        {onDashboard && (
          <div className="md:hidden">
            <motion.button
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: -90 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsModalOpen(true)}
              className="fixed bottom-20 right-6 z-40 bg-primary dark:bg-[#E5E5E5] dark:text-black text-primary-foreground w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
              aria-label="Add new job"
            >
              <Plus size={28} />
            </motion.button>
          </div>
        )}

        {/* Bottom Navigation Bar */}
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed bottom-0 z-[2147483647] w-full border-t bg-background/95 backdrop-blur-sm dark:bg-[#0B0B0B]"
        >
          <div className="flex h-16 items-center justify-around">
            <MobileLink
              to="/dashboard"
              icon={LayoutDashboard}
              onClick={() => navigate("/dashboard")}
            >
              Tracker
            </MobileLink>
            <MobileLink
              to="/jobs"
              icon={List}
              onClick={() => navigate("/jobs")}
            >
              Jobs
            </MobileLink>
            <MobileLink
              to="/profile"
              icon={User}
              onClick={() => navigate("/profile")}
            >
              Profile
            </MobileLink>
            <button
              onClick={logout}
              className="flex flex-col items-center gap-1 p-2 text-muted-foreground w-16"
            >
              <LogOut size={22} />
              <span className="text-xs font-medium">Logout</span>
            </button>
          </div>
        </motion.div>
      </div>
      <AddJobForm isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default NavBar;
