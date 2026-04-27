import { FaFolderOpen } from "react-icons/fa";
import { FiActivity } from "react-icons/fi";
import { AiOutlineLock } from "react-icons/ai";
import { FaFolder } from "react-icons/fa";
import { FaFileLines } from "react-icons/fa6";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const EmptyDashboard = () => {
  const navigate = useNavigate();
  return (
    <div className=" dark:bg-[#121110]  flex flex-col ">
      <div className="mb-1">
        <h1 className="text-2xl font-semibold">Welcome back, Lakshay 👋</h1>
        <div className="w-12 h-[4px] bg-orange-500 mt-2 rounded"></div>
      </div>

      <div className="flex flex-col items-center justify-center flex-1 relative px-2 py-8">
        <svg
          viewBox="0 0 360 380"
          className="w-[280px] h-auto"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ff8c50" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#000" stopOpacity="0" />
            </radialGradient>
          </defs>

          <circle cx="160" cy="170" r="150" fill="url(#glow)" />

          <rect
            x="32"
            y="24"
            width="280"
            height="300"
            rx="30"
            className="fill-black/5 dark:fill-white/10 stroke-black/10 dark:stroke-white/20"
          />

          <text
            x="250"
            y="50"
            fontSize="10"
            className="fill-[#8b5e3c] dark:fill-[#cfa48a]"
            textAnchor="end"
            letterSpacing="2"
          >
            SYSTEM READY
          </text>

          <rect x="140" y="140" width="60" height="40" rx="6" fill="#d89a74" />
          <rect x="140" y="130" width="30" height="15" rx="4" fill="#d89a74" />

          <text
            x="170"
            y="200"
            fontSize="12"
            className="fill-[#8b5e3c] dark:fill-[#cfa48a]"
            textAnchor="middle"
            letterSpacing="1"
          >
            0x00_EMPTY
          </text>

          {/* Dots */}
          <circle cx="44" cy="305" r="2" fill="#cfa48a" opacity="0.5" />
          <circle cx="54" cy="305" r="2" fill="#cfa48a" opacity="0.5" />
          <circle cx="64" cy="305" r="2" fill="#cfa48a" opacity="0.5" />

          <g transform="translate(-15, -15) rotate(-18 60 60)">
            <rect
              x="20"
              y="20"
              width="80"
              height="80"
              rx="20"
              className="fill-black/10 dark:fill-white/10"
            />
            <rect x="50" y="50" width="20" height="20" rx="4" fill="#966854" />
          </g>

          <g transform="translate(40, 44) rotate(25 260 260)">
            <rect
              x="230"
              y="230"
              width="70"
              height="70"
              rx="16"
              className="fill-black/10 dark:fill-white/10"
            />
            <polygon points="255,255 270,265 255,275" fill="#966854" />
            <polygon points="270,255 285,265 270,275" fill="#966854" />
          </g>
        </svg>

        <h2 className="mt-8 text-xl font-semibold">No applications yet</h2>

        <p className="text-[#494949] dark:text-gray-400 text-sm mt-2">
          Start tracking your job journey 🚀
        </p>

        <button
          onClick={() => navigate("/job/new")}
          className="mt-6 px-6 py-3 rounded-full bg-gradient-to-r from-[#FF720F] via-[#FF8637] to-[#FFAD83] text-black font-semibold hover:scale-105 transition-all duration-300 shadow-lg"
        >
          Add Your First Application
        </button>

        <div className="flex flex-wrap justify-center sm:justify-between gap-4 mt-8 text-[#7f7d7d] dark:text-gray-500 text-xs items-center">
          <div className="flex items-center gap-1">
            <FiActivity />
            <span>INTERVIEW PREP</span>
          </div>

          <div className="flex items-center gap-1">
            <FiActivity />
            <span>REAL-TIME INSIGHTS</span>
          </div>

          <div className="flex items-center gap-1 w-full justify-center sm:w-auto">
            <AiOutlineLock />
            <span>SECURE DATA</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyDashboard;