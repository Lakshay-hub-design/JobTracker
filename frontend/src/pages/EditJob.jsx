import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContex";

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [form, setForm] = useState({
    company: "",
    position: "",
    status: "",
    jobType: "",
    location: "",
    notes: "",
    resumeUrl: ""
  });

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/jobs/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setForm(res.data);
      } catch (err) {
        setError("Failed to fetch job details");
      }
    };
    fetchJob();
  }, [id, token]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:4000/api/jobs/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate("/dashboard");
    } catch (err) {
      setError("Failed to update job");
    }
  };

  return (
     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-orange-500 p-4">
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h3 className="text-xl font-semibold mb-4">Edit Job</h3>
      {error && <div className="text-red-500 mb-3">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input name="company" value={form.company} onChange={handleChange}
               placeholder="Company" className="w-full px-3 py-2 border rounded" required />
        <input name="position" value={form.position} onChange={handleChange}
               placeholder="Position" className="w-full px-3 py-2 border rounded" required />
        <input type="text" name="location" placeholder="Location" value={form.location} onChange={handleChange} className="w-full border p-2 rounded" />
        <div className="flex gap-3">
          <select name="status" value={form.status} onChange={handleChange} className="flex-1 px-3 py-2 border rounded">
            <option value="applied">Applied</option>
            <option value="interview">Interview</option>
            <option value="offer">Offer</option>
            <option value="rejected">Rejected</option>
          </select>
          <select name="jobType" value={form.jobType} onChange={handleChange} className="flex-1 px-3 py-2 border rounded">
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="internship">Internship</option>
            <option value="remote">Remote</option>
          </select>
        </div>
         <input type="text" name="resumeUrl" placeholder="Resume Link" value={form.resumeUrl} onChange={handleChange} className="w-full border p-2 rounded" />
        <textarea name="notes" value={form.notes} onChange={handleChange}
                  placeholder="Notes" className="w-full px-3 py-2 border rounded" rows={4} />
        <textarea name="description" value={form.description} onChange={handleChange}
                  placeholder="Job Description" className="w-full px-3 py-2 border rounded" rows={4} />
        <button className="w-full bg-yellow-300 text-black py-2 rounded">Update Job</button>
      </form>
    </div>
    </div>
  );
};

export default EditJob;
