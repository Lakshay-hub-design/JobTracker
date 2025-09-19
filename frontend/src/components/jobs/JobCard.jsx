import { useState } from "react";
import {
  Building2,
  Calendar,
  Edit2,
  Trash2,
  ChevronDown,
  ChevronUp,
  Briefcase,
} from "lucide-react";
import EditJob from "../features/EditJob";
import axios from "axios";
import { useJobs } from "../../context/JobContext";

const JobCard = ({ job }) => {
  const [expanded, setExpanded] = useState(false);
  const [isOpenModel, setIsOpenModel] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const {fetchJobs} = useJobs()

  const handleOpenModal = (job) => {
    setSelectedJob(job);
    setIsOpenModel(true);
  };

  const handleCloseModal = () =>{
    setIsOpenModel(false)
  }

  const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this application?"))
    return;

  try {
    await axios.post(`${import.meta.env.VITE_BASE_URL}/job/delete/${id}`,{}, {
      withCredentials: true,
    });
    fetchJobs()
  } catch (error) {
    console.error("Error deleting job:", error.response?.data || error.message);
  }
};

  return (
    <div className="">
      {/* Top row (always visible) */}
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div>
          <div className="flex items-center gap-2">
            <Briefcase className="text-blue-500" size={20} />
            <h2 className="text-lg font-semibold">{job.position}</h2>
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
            <Building2 size={16} className="mr-1" />
            {job.company}
          </div>
        </div>
        <div>
          {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </div>

      {/* Expanded section */}
      {expanded && (
        <div className="mt-3 space-y-2">
          <span className="px-3 py-1 bg-gray-200 dark:text-black rounded-full text-sm">
            {job.status}
          </span>

          <div className="flex items-center text-gray-400 text-sm mt-4">
            <Calendar size={16} className="mr-1" />
            {new Date(job.appliedDate).toLocaleDateString()}
          </div>

          <p className="text-sm">
            <strong>Notes:</strong> {job.notes}
          </p>
          <p className="text-sm">
            <strong>Description:</strong> {job.description}
          </p>

          {isOpenModel && (
            <>
              {/* Overlay */}
              <div
                className="fixed inset-0 z-40"
                onClick={handleCloseModal}
              ></div>

              {/* Modal Content */}
              <div className="fixed inset-0 flex items-center justify-center  z-50">
                <div
                  className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Close Button */}
                  <button
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                    onClick={handleCloseModal}
                  >
                    ✖
                  </button>

                  {/* AddJob Component */}
                  <EditJob
                    onClose={handleCloseModal}
                    job={selectedJob}
                  />
                </div>
              </div>
            </>
          )}
          {/* Action buttons */}
          <div className="flex gap-3 mt-3">
            <button
              onClick={() => handleOpenModal(job)}
              className="flex items-center gap-1 px-3 py-1 bg-gray-300 hover:bg-gray-400 dark:bg-[#282828] hover:dark:bg-[#4a4949] rounded-lg text-sm"
            >
              <Edit2 size={16} /> Edit
            </button>
            <button
              onClick={() =>handleDelete(job._id)}
              className="flex items-center gap-1 px-3 py-1 bg-red-400 hover:bg-red-500 rounded-lg text-sm"
            >
              <Trash2 size={16} /> Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobCard;
