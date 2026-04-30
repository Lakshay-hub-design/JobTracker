import { useEffect, useState } from "react";
import { useObjective } from "../hooks/useObjectives";
import AddObjectiveModal from "./AddObjectiveModel";
import { useDashboard } from "../hooks/useDashboard";
import { MoreVertical } from "lucide-react";


const WeeklyGoals = ({ objectives, handleIncrement, handleDelete }) => {
  const { refetch } = useDashboard();
  const { handleCreate } = useObjective(refetch);
  const [showModal, setShowModal] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);

  useEffect(() => {
    const handleClickOutside = () => setOpenMenuId(null);

    window.addEventListener("click", handleClickOutside);

    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  if (!objectives) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dark:bg-[#1A1A1B] rounded-4xl p-6 border border-white/5 shadow-lg flex flex-col h-[362px]">
      <p className="text-xs text-orange-400 dark:text-[#FFB694] tracking-wide uppercase mb-4">
        Weekly Objectives
      </p>

      <div className="space-y-5 overflow-y-auto mt-2 flex-1 pr-2 custom-scroll scroll-smooth">
        {objectives?.map((objective) => {
          const percent = Math.min(
            (objective.progress / objective.target) * 100,
            100,
          );

          return (
            <div key={objective._id}>
              <div className="flex justify-between items-center text-sm text-gray-700 dark:text-gray-300 mb-2">
                <span>{objective.title}</span>

                <div className="flex items-center gap-2">
                  {objective.status === "completed" ? (
                    <span className="text-green-400 text-xs">Done</span>
                  ) : (
                    <span>
                      {objective.progress}/{objective.target}
                    </span>
                  )}

                  {objective.isManual && objective.status !== "completed" && (
                    <button
                      onClick={() => handleIncrement(objective._id)}
                      className="text-xs px-2 py-0.5 bg-orange-500/20 text-orange-400 rounded hover:bg-orange-500/30 transition"
                    >
                      + Add
                    </button>
                  )}
                  <div className="relative">
                    <button
                      onClick={(e) =>{
                        e.stopPropagation();
                        setOpenMenuId(
                          openMenuId === objective._id ? null : objective._id,
                        )
                      }}
                      className="text-gray-400 hover:text-white transition px-1"
                    >
                      <MoreVertical size={16} />
                      
                    </button>

                    {openMenuId === objective._id && (
                      <div
                      onClick={(e) => e.stopPropagation()}
                      className="absolute right-0 mt-2 w-32 bg-white dark:bg-[#2A2A2B] border border-white/10 rounded-lg shadow-lg z-10 animate-fadeIn">
                        

                        <button
                          className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-gray-100 dark:hover:bg-[#3A3A3B]"
                          onClick={() => {
                            setOpenMenuId(null);
                            handleDelete(objective._id);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="w-full h-2 bg-[#e3e2e2] dark:bg-[#353436] rounded-full overflow-hidden">
                <div
                  className={`h-2 rounded-full transition-all ${
                    objective.status === "completed"
                      ? "bg-green-400"
                      : "bg-orange-500"
                  }`}
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={() => setShowModal(true)}
        className="mt-auto pt-6 w-full text-xs text-orange-400 hover:text-orange-300 transition"
      >
        + Customize Weekly Goals
      </button>

      {showModal && (
        <AddObjectiveModal
          onClose={() => setShowModal(false)}
          onSubmit={handleCreate}
        />
      )}
    </div>
  );
};

export default WeeklyGoals;
