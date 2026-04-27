import { useState } from "react";
import { useObjective } from "../hooks/useObjectives";
import AddObjectiveModal from "./AddObjectiveModel";
import { useDashboard } from "../hooks/useDashboard";


const WeeklyGoals = ({ objectives, handleIncrement }) => {
  const { refetch } = useDashboard()
  const { handleCreate } = useObjective(refetch)
  const [showModal, setShowModal] = useState(false)

  if (!objectives){
    return <div>Loading...</div>
  }

  return (
    <div className="dark:bg-[#1A1A1B] rounded-4xl p-6 border border-white/5 shadow-lg flex flex-col h-full">
      <p className="text-xs text-orange-400 dark:text-[#FFB694] tracking-wide uppercase mb-4">
        Weekly Objectives
      </p>

      <div className="space-y-5 mt-2 flex-1">
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
      className="mt-auto pt-6 w-full text-xs text-orange-400 hover:text-orange-300 transition">
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
}

export default WeeklyGoals