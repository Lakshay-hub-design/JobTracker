import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from '../context/AuthContex';
import { useNavigate } from "react-router-dom";

const Jobs = () => {
  const { token } = useAuth();
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/jobs", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setJobs(res.data.jobs || []);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setJobs([]);
      }
    };

    fetchJobs();
  }, [token]);

  const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this job?")) return;
  try {
    await axios.delete(`http://localhost:4000/api/jobs/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setJobs(jobs.filter(job => job._id !== id));
  } catch (err) {
    console.error("Error deleting job:", err);
  }
};


  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">My Job Applications</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobs.map(job => (
          <div key={job._id} className="bg-white shadow rounded p-4">
            <h2 className="text-xl font-semibold">{job.position}</h2>
            <p className="text-gray-700">{job.company}</p>
            <p>Status: <span className="font-bold">{job.status}</span></p>
            <p>Applied: {job.appliedDate ? new Date(job.appliedDate).toLocaleDateString() : "N/A"}</p>
            {job.resumeUrl && (
              <a href={job.resumeUrl} target="_blank" rel="noreferrer" className="text-blue-500 underline mr-30">
                View Resume
              </a>
            )}
            <button onClick={() => navigate(`/edit-job/${job._id}`)} className="text-blue-500">Edit</button>
            <button onClick={() => handleDelete(job._id)} className="text-red-500 ml-2">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jobs;
