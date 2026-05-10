import {
  Calendar,
  CheckCircle,
  RefreshCw,
  Plus
} from "lucide-react";

const FollowUpCard = ({
  job,
  onMarkDone,
  onReschedule
}) => {

  const hasFollowUp = !!job.followUpDate;
  const isCompleted = job.isFollowUpDone

  const getStatus = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const date = new Date(job.followUpDate);
    date.setHours(0, 0, 0, 0);

    const diff = Math.ceil(
      (date - today) / (1000 * 60 * 60 * 24)
    );

    if (diff < 0) {
      return { label: "Overdue", color: "red" };
    }

    if (diff === 0) {
      return { label: "Today", color: "yellow" };
    }

    return {
      label: `In ${diff} days`,
      color: "green"
    };
  };

  const status = hasFollowUp && !isCompleted
    ? getStatus()
    : null;

  const colorMap = {
    red: "bg-red-500/10 text-red-500 border-red-500/20",
    yellow:
      "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    green:
      "bg-green-500/10 text-green-500 border-green-500/20",
  };

  return (
    <div
      className="
        relative p-5 rounded-2xl
        bg-white/70 dark:bg-[#1f1f1f]/70
        backdrop-blur-xl
        border border-white/20 dark:border-white/10
        shadow-md hover:shadow-xl
        transition-all duration-300
        hover:scale-[1.01]
      "
    >

      {/* Glow */}
      <div
        className="
          absolute inset-0 rounded-2xl
          pointer-events-none
          bg-gradient-to-br
          from-orange-500/5
          to-transparent
          opacity-0 hover:opacity-100
          transition
        "
      />

      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">

        <div className="flex items-center gap-2">
          <Calendar
            size={18}
            className="text-orange-500"
          />

          <h3
            className="
              text-sm font-semibold
              text-gray-800 dark:text-white
            "
          >
            Follow-up
          </h3>
        </div>

        {hasFollowUp && !isCompleted && (
          <span
            className={`
              text-xs px-2.5 py-1 rounded-full
              border font-medium
              ${colorMap[status.color]}
            `}
          >
            {status.label}
          </span>
        )}

      </div>

      {/* CONTENT */}

      {/* ================= ACTIVE FOLLOWUP ================= */}
      {hasFollowUp && !isCompleted && (
        <>
          <p
            className="
              text-sm text-gray-600
              dark:text-gray-300 mb-4
            "
          >
            Next follow-up:

            <span
              className="
                ml-2 font-medium
                text-gray-900 dark:text-white
              "
            >
              {new Date(
                job.followUpDate
              ).toDateString()}
            </span>
          </p>

          <div className="flex gap-2">

            <button
              onClick={onReschedule}
              className="
                flex items-center gap-1
                px-3 py-1.5 text-sm
                rounded-lg
                bg-orange-500/10 text-orange-500
                hover:bg-orange-500/20
                transition active:scale-95
              "
            >
              <RefreshCw size={14} />
              Reschedule
            </button>

            <button
              onClick={onMarkDone}
              className="
                flex items-center gap-1
                px-3 py-1.5 text-sm
                rounded-lg
                bg-green-500/10 text-green-500
                hover:bg-green-500/20
                transition active:scale-95
              "
            >
              <CheckCircle size={14} />
              Done
            </button>

          </div>
        </>
      )}

      {/* ================= COMPLETED ================= */}
      {hasFollowUp && isCompleted && (
        <>
          <div
            className="
              flex items-center gap-2
              text-green-500 mb-3
            "
          >
            <CheckCircle size={18} />

            <p className="font-medium">
              Follow-up Completed
            </p>
          </div>

          <p
            className="
              text-sm text-gray-500
              dark:text-gray-400 mb-4
            "
          >
            Completed follow-up for:

            <span className="ml-2 font-medium">
              {new Date(
                job.followUpDate
              ).toDateString()}
            </span>
          </p>

          <button
            onClick={onReschedule}
            className="
              flex items-center gap-2
              px-4 py-2
              rounded-xl
              bg-orange-500 text-white
              hover:bg-orange-600
              transition
            "
          >
            <RefreshCw size={14} />
            Schedule Again
          </button>
        </>
      )}

      {/* ================= EMPTY ================= */}
      {!hasFollowUp && (
        <>
          <p
            className="
              text-sm text-gray-500
              dark:text-gray-400 mb-4
            "
          >
            No follow-up scheduled yet.
          </p>

          <button
            onClick={onReschedule}
            className="
              flex items-center gap-2
              px-4 py-2
              rounded-xl
              bg-orange-500 text-white
              hover:bg-orange-600
              transition
            "
          >
            <Calendar size={14} />
            Add Follow-up
          </button>
        </>
      )}

    </div>
  );
};

export default FollowUpCard;