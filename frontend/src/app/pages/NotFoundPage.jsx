import { Compass, Search, Map, Briefcase, BriefcaseBusiness, LayoutDashboard } from "lucide-react";
import { MdDashboard } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full flex items-center justify-center bg-[#F5F3F1]">
      
      <div className="text-center relative">

        {/* Floating Icons */}
        <div className="absolute -top-6 right-10 bg-white/70 backdrop-blur-md p-3 rounded-full shadow-md">
          <Map size={16} className="text-[#A33A0B]" />
        </div>

        <div className="absolute top-36 left-10 bg-white/70 backdrop-blur-md p-3 rounded-full shadow-md">
          <Search size={16} className="text-[#A33A0B]" />
        </div>

        {/* Center Card */}
        <div className="mx-auto w-40 h-40 rounded-3xl bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)] flex items-center justify-center">
          <div className="w-16 h-16 rounded-full border-4 border-[#A33A0B] flex items-center justify-center">
            <Compass size={28} className="text-[#A33A0B]" />
          </div>
        </div>

        {/* 404 Text */}
        <h1 className="text-7xl font-bold text-gray-900 mt-6">404</h1>

        <p className="text-lg text-[#A33A0B] mt-2 font-medium">
          Lost in the career maze?
        </p>

        <p className="text-gray-500 mt-3 max-w-md mx-auto text-sm leading-relaxed">
          The page you're looking for doesn't exist in this timeline. 
          Let's get you back on the right path.
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-6">
          
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 px-5 py-3 rounded-full bg-[#A33A0B] text-white text-sm font-medium shadow-md hover:opacity-90 transition"
          >
            <LayoutDashboard size={18} /> Return to Dashboard
          </button>

          <button
            onClick={() => navigate("/jobs")}
            className="flex items-center gap-2 px-5 py-3 rounded-full border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-100 transition"
          >
            <BriefcaseBusiness size={18} /> Check Active Jobs
          </button>

        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;