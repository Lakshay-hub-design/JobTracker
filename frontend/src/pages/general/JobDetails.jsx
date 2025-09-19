import { useNavigate, useParams } from "react-router-dom";
import { useJobs } from "../../context/JobContext";
import { useState } from "react";
import EditJob from "../../components/features/EditJob";
import axios from "axios";
import NavBar from "../../components/dashboard/NavBar";
import { useTheme } from "../../context/ThemeContext";

export default function JobDetails() {
  const { id } = useParams();
  const { jobs } = useJobs();
  const job = jobs.find((j) => j._id === id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { fetchJobs } = useJobs();

  const [notes, setNotes] = useState(job?.notes || "");

  const handleOpenModal = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this application?"))
      return;

    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/job/delete/${id}`,
        {},
        { withCredentials: true }
      );

      navigate("/dashboard");
      fetchJobs();
    } catch (error) {
      console.error("Error deleting job:", error.response?.data || error.message);
    }
  };

  if (!job) {
    return <p className="text-center text-gray-500">Job not found</p>;
  }

  return (
    <div className="dark:bg-[#0A0A0A] min-h-screen">
      <NavBar theme={theme} toggleTheme={toggleTheme} />

      <div className="p-4 sm:p-6 lg:px-20 grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {/* Left card */}
        <div className="bg-white rounded-xl shadow p-4 sm:p-6 dark:bg-[#171717] dark:text-white">
          <h2 className="text-xl sm:text-2xl font-bold mb-2">{job.position}</h2>
          <p className="text-gray-500 text-sm sm:text-base">{job.company}</p>
          <p className="mt-1">
            <strong>Location:</strong> {job.location}
          </p>
          <p>
            <strong>Job Type:</strong> {job.jobType}
          </p>
          <p>
            <strong>Published:</strong>{" "}
            {new Date(job.createdAt).toLocaleDateString()}
          </p>
          <hr className="my-4" />
          <h3 className="font-semibold mb-2">Description</h3>
          <p className="text-sm sm:text-base">
            {job.description || "No description"}
          </p>
        </div>

        {/* Right card */}
        <div className="bg-white rounded-xl shadow p-4 sm:p-6 dark:bg-[#171717] dark:text-white">
          <h3 className="font-semibold mb-3">📝 Notes</h3>
          <textarea
            className="w-full border rounded p-2 text-sm sm:text-base dark:bg-[#0A0A0A] dark:border-gray-700"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          <button className="mt-2 bg-black text-white px-4 py-2 rounded text-sm sm:text-base">
            Save Notes
          </button>

          <hr className="my-4" />

          <div className="flex flex-col sm:flex-row gap-4">
            <div>
              <p>📄 Cover Letter</p>
              <button className="px-3 py-1 border rounded text-sm sm:text-base">
                Upload
              </button>
            </div>
            <div>
              <p>📑 CV / Resume</p>
              <button className="px-3 py-1 border rounded text-sm sm:text-base">
                Upload
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <button
              onClick={() => handleOpenModal(job)}
              className="px-3 py-1 border rounded text-sm sm:text-base"
            >
              ✏️ Edit
            </button>
            <button
              onClick={() => handleDelete(job.id)}
              className="px-3 py-1 bg-red-600 text-white rounded text-sm sm:text-base"
            >
              🗑 Delete
            </button>
          </div>

          {isModalOpen && (
            <>
              {/* Overlay */}
              <div
                className="fixed inset-0 bg-black/60 z-40"
                onClick={handleCloseModal}
              ></div>
              {/* Modal Content */}
              <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
                <div
                  className="bg-background rounded-lg shadow-xl p-6 w-full max-w-lg relative dark:bg-[#171717]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className="absolute top-3 right-3 text-xl font-bold"
                    onClick={handleCloseModal}
                  >
                    &times;
                  </button>
                  <EditJob onClose={handleCloseModal} job={selectedJob} />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
