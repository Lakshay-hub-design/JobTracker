import { LayoutDashboard, List, User, LogOut, Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Navbar = ({ logout, toggleTheme, darkMode }) => {
  const navigate = useNavigate();

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 w-full bg-blue-700 text-white shadow-md"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        
        {/* Left - Logo + App Name */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <LayoutDashboard size={20} />
          </div>
          <h1 className="text-xl font-bold tracking-wide">JobTracker</h1>
        </div>

        {/* Center - Nav Links */}
        <div className="hidden md:flex items-center gap-6">
          <button onClick={() => navigate("/dashboard")} className="flex items-center gap-2 hover:bg-blue-600 px-3 py-2 rounded-md">
            <LayoutDashboard size={18} /> Tracker
          </button>
          <button onClick={() => navigate("/jobs")} className="flex items-center gap-2 hover:bg-blue-600 px-3 py-2 rounded-md">
            <List size={18} /> Jobs
          </button>
          <button onClick={() => navigate("/profile")}   className="flex items-center gap-2 hover:bg-blue-600 px-3 py-2 rounded-md">
            <User size={18} /> Profile
          </button>
        </div>

        {/* Right - Theme Toggle + Logout */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-blue-600 transition"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={logout}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-3 py-2 rounded-md transition"
          >
            <LogOut size={18} /> <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
