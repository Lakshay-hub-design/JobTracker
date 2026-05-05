import React, { useState } from "react";
import { useJobDetails } from "../hooks/useJobDetails";
import { useParams } from "react-router-dom";
import AIReportSkeleton from "../components/AIReportSkeleton";

const NAV_ITEMS = [
  {
    id: "technical",
    label: "Technical Questions",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    id: "behavioral",
    label: "Behavioral Questions",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    id: "roadmap",
    label: "Road Map",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="3 11 22 2 13 21 11 13 3 11" />
      </svg>
    ),
  },
];

const QuestionCard = ({ item, index }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white dark:bg-[#221F1E] rounded-4xl overflow-hidden hover:border-[#3a455e] transition">
      <div
        className="flex gap-3 p-4 py-6 cursor-pointer"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="self-start text-[13px] font-bold text-[#AE4113] bg-[#F6E6E0] border border-pink-500/20 px-2 py-[2px] rounded">
          Q{index + 1}
        </span>
        <p className="flex-1 text-md font-medium text-[#644D46] dark:text-[#E2DBD9] leading-relaxed">
          {item.question}
        </p>
        <span
          className={`transition ${open ? "rotate-180 text-[#AE4113]" : "text-[#644D46]"}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </div>
      {open && (
        <div className="px-4 pb-4 border-t border-[#2a3348] pt-3 flex flex-col gap-3">
          <div className="q-card__section">
            <span className="text-[10px] uppercase font-bold text-[#AE4113] bg-[#F6E6E0] border border-pink-500/20 px-2 py-[2px] rounded">
              Intention
            </span>
            <p className="text-normal text-[#644D46] dark:text-[#b59d95] mt-1">
              {item.intention}
            </p>
          </div>
          <div className="q-card__section">
            <span className="text-[10px] uppercase font-bold text-[#16A34A] bg-[#DCFCE6] border border-green-400/20 px-2 py-[2px] rounded">
              Model Answer
            </span>
            <p className="text-normal text-[#644D46] dark:text-[#b59d95] mt-1">
              {item.answer}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

const RoadMapDay = ({ day }) => (
  <div className="relative pl-8 md:pl-14 py-3">
    <div className="flex items-center gap-2">
      <span className="text-[10px] font-bold text-[#AE4113] bg-[#F6E6E0] border border-pink-500/30 px-2 py-[2px] rounded-full">
        Day {day.day}
      </span>
      <h3 className="text-normal font-semibold">{day.focus}</h3>
    </div>
    <ul className="mt-2 flex flex-col gap-1">
      {day.tasks.map((task, i) => (
        <li
          key={i}
          className="flex gap-2 text-sm text-[#644D46] dark:text-[#b19292]"
        >
          <span className="w-[5px] h-[5px] bg-[#AE4113] rounded-full mt-2" />
          {task}
        </li>
      ))}
    </ul>
  </div>
);

const getMatchData = (score) => {
  if (score >= 75) {
    return {
      text: "Strong match for this role",
      color: "text-green-400",
      stroke: "#22c55e",
      bg: "bg-green-500/20",
    };
  } else if (score >= 50) {
    return {
      text: "Moderate match, needs improvement",
      color: "text-yellow-400",
      stroke: "#facc15",
      bg: "bg-yellow-500/20",
    };
  } else {
    return {
      text: "Low match, consider improving skills",
      color: "text-red-400",
      stroke: "#ef4444",
      bg: "bg-red-500/20",
    };
  }
};

const getSeverityStyle = (severity) => {
  switch (severity) {
    case "high":
      return {
        label: "GAP FOUND",
        badge: "bg-red-500/20 text-red-400",
        bar: "bg-red-400",
        width: "30%",
      };

    case "medium":
      return {
        label: "INTERMEDIATE",
        badge: "bg-orange-500/20 text-orange-400",
        bar: "bg-orange-400",
        width: "60%",
      };

    case "low":
      return {
        label: "STRONG",
        badge: "bg-green-500/20 text-green-400",
        bar: "bg-green-400",
        width: "85%",
      };

    default:
      return {};
  }
};

const AIReportPage = () => {
  const [activeNav, setActiveNav] = useState("technical");
  const { jobId } = useParams();
  const { aiReport, loading, error } = useJobDetails(jobId);
  
  if (loading) return <AIReportSkeleton />
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!aiReport) return <p className="text-gray-500">No AI report found.</p>;

  const match = getMatchData(aiReport.matchScore);
  const radius = 50;
  const stroke = 6;
  const normalizedRadius = radius - stroke;
  const circumference = normalizedRadius * 2 * Math.PI;

  const strokeDashoffset =
    circumference - (aiReport.matchScore / 100) * circumference;

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row w-full max-w-7xl mx-auto min-h-screen bg-[#FBF9F8] dark:bg-[#121110]">
        <nav className="hidden w-[220px] py-4 md:flex flex-col justify-between">
          <div className="nav-content flex flex-col flex-1  px-4 pb-6 gap-4 overflow-y-auto">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                className={`flex items-center gap-2 w-full text-sm text-[#644D46] px-3 py-2 font-bold rounded-full transition
                     ${
                       activeNav === item.id
                         ? "bg-[#F6E6E0] text-[#AE4113]"
                         : ""
                     }`}
                onClick={() => setActiveNav(item.id)}
              >
                <span className="interview-nav__icon">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        </nav>

        <main className="flex-1 p-4 overflow-y-auto order-2 lg:order-2">
          {activeNav === "technical" && (
            <section>
              <div className="flex justify-between items-center border-b border-[#2a3348] pb-4 mb-4">
                <h2 className="text-xl md:text-2xl font-bold">Technical Questions</h2>
                <span className="text-xs bg-[#fc9472] px-3 py-1 rounded-full text-[#92472F] font-bold">
                  {aiReport.technicalQuestions.length} questions
                </span>
              </div>
              <div className="flex flex-col gap-3">
                {aiReport.technicalQuestions.map((q, i) => (
                  <QuestionCard key={i} item={q} index={i} />
                ))}
              </div>
            </section>
          )}

          {activeNav === "behavioral" && (
            <section>
              <div className="flex gap-3 justify-between items-center border-b border-[#2a3348] pb-4 mb-4">
                <h2 className="text-xl md:text-2xl font-bold">Behavioral Questions</h2>
                <span className="text-xs bg-[#fa9776] px-3 py-1 rounded-full text-[#92472F] font-bold">
                  {aiReport.behaviouralQuestions.length} questions
                </span>
              </div>
              <div className="flex flex-col gap-3">
                {aiReport.behaviouralQuestions.map((q, i) => (
                  <QuestionCard key={i} item={q} index={i} />
                ))}
              </div>
            </section>
          )}

          {activeNav === "roadmap" && (
            <section>
              <div className="flex justify-between items-center border-b border-[#2a3348] pb-4 mb-4">
                <h2 className="text-xl md:text-2xl font-bold">Preparation Road Map</h2>
                <span className="">
                  {aiReport.preparationPlan.length}-day plan
                </span>
              </div>
              <div className="relative">
                <div className="absolute md:left-[28px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#AE4113] to-transparent" />
                {aiReport.preparationPlan.map((day) => (
                  <RoadMapDay key={day.day} day={day} />
                ))}
              </div>
            </section>
          )}
        </main>

        <aside className="md:w-[330px] p-4 flex flex-col gap-6 order-1 lg:order-3">
          <div className="flex bg-white dark:bg-[#221F1E] rounded-3xl p-4 flex-col items-center gap-2">
            <p className="text-xs uppercase text-[#5c5a5a]">Match Score</p>

            <div className="relative w-[100px] h-[150px] flex items-center justify-center">
              <svg height="100" width="100" className="rotate-[-90deg]">
                <circle
                  className="text-gray-200 dark:text-[#2a2726]"
                  stroke="currentcolor"
                  fill="transparent"
                  strokeWidth={6}
                  r={normalizedRadius}
                  cx="50"
                  cy="50"
                />

                <circle
                  stroke={match.stroke}
                  fill="transparent"
                  strokeWidth={6}
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  r={normalizedRadius}
                  cx="50"
                  cy="50"
                />
              </svg>

              <div className="absolute flex flex-col items-center">
                <span className="text-xl font-bold">{aiReport.matchScore}</span>
                <span className="text-xs text-gray-400">%</span>
              </div>
            </div>

            <p className={`text-sm text-center ${match.color}`}>{match.text}</p>
          </div>

          <div className="bg-[#F5F3F2] dark:bg-[#221F1E] rounded-3xl p-5 flex flex-col gap-4">
            <p className="text-xs uppercase text-gray-500">Skill Analysis</p>

            {/* 🔥 MOBILE UI */}
            <div className="flex flex-wrap gap-2 lg:hidden">
              {aiReport.skillGaps.map((gap, i) => {
                const style =
                  gap.severity === "high"
                    ? "border-red-400/30 text-red-400 bg-red-400/10"
                    : gap.severity === "medium"
                      ? "border-orange-400/30 text-orange-400 bg-orange-400/10"
                      : "border-gray-500/30 text-gray-300 bg-gray-500/10";

                const icon =
                  gap.severity === "high"
                    ? "✖"
                    : gap.severity === "medium"
                      ? "↗"
                      : "✔";

                return (
                  <div
                    key={i}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${style}`}
                  >
                    <span className="text-xs">{icon}</span>
                    <span className="text-sm">{gap.skill}</span>
                  </div>
                );
              })}
            </div>

            {/* 🔥 DESKTOP UI (existing one) */}
            <div className="hidden lg:flex flex-col gap-4">
              {aiReport.skillGaps.map((gap, i) => {
                const style = getSeverityStyle(gap.severity);

                return (
                  <div key={i} className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                        {gap.skill}
                      </p>

                      <span
                        className={`text-xs px-3 py-1 rounded-full font-medium ${style.badge}`}
                      >
                        {style.label}
                      </span>
                    </div>

                    <div className="w-full h-2 bg-gray-200 dark:bg-[#2a2726] rounded-full overflow-hidden">
                      <div
                        className={`h-full ${style.bar} rounded-full transition-all duration-500`}
                        style={{ width: style.width }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="bg-[#e8e6e5] dark:bg-[#1f1d1c] md:hidden p-1 rounded-full flex items-center justify-between gap-1 w-full max-w-md">
            {[
              { id: "technical", label: "Technical" },
              { id: "behavioral", label: "Behavioral" },
              { id: "roadmap", label: "Road Map" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveNav(tab.id)}
                className={`
        flex-1 text-center py-2 rounded-full text-sm font-medium transition-all
        ${
          activeNav === tab.id
            ? "bg-[#bcb9b9] dark:bg-[#2a2726] text-orange-400 shadow-inner"
            : "text-[#817979] dark:text-gray-400 hover:text-white"
        }
      `}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default AIReportPage;
