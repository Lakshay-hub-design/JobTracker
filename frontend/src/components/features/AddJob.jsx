import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useJobs } from '../../context/JobContext';


export default function AddJob({ onClose , isOpen }) {
    if(!isOpen) return null
  const [form, setForm] = useState({
    company: '', position: '', status: 'applied', location: "", jobType: 'full-time', notes: '', description: '', resumeUrl: "", followUpDate: ''
  });
  const {fetchJobs} = useJobs()
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try{
        await axios.post('http://localhost:3000/api/job/add-job',
            form,
            {withCredentials: true}
        )
        fetchJobs()
        onClose();
    }
    catch(err){
        if(err.response.data.message){
            setError(err.response.data.message)
        }else{
            setError("Server error")
        }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm ">
      <div className="relative w-full max-w-xl p-6 bg-white dark:bg-[#232B2B] dark:text-white rounded-lg shadow-lg">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
        >
          &times;
        </button>

        <h3 className="text-xl font-semibold mb-4">Add Job</h3>
        {error && <div className="text-red-500 mb-3">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="company"
            value={form.company}
            onChange={handleChange}
            placeholder="Company"
            className="w-full px-3 py-2 border rounded"
            required
          />
          <input
            name="position"
            value={form.position}
            onChange={handleChange}
            placeholder="Position"
            className="w-full px-3 py-2 border rounded"
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <div className="flex gap-3">
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="flex-1 px-3 py-2 border rounded"
            >
              <option value="applied">Applied</option>
              <option value="interview">Interview</option>
              <option value="offer">Offer</option>
              <option value="rejected">Rejected</option>
            </select>
            <select
              name="jobType"
              value={form.jobType}
              onChange={handleChange}
              className="flex-1 px-3 py-2 border rounded"
            >
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="internship">Internship</option>
              <option value="remote">Remote</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-black/50 dark:text-white">Follow-up Date</label>
            <input
              type="date"
              name="followUpDate"
              value={form.followUpDate || ""}
              onChange={handleChange}
              className="p-2 rounded border text-black/50 dark:text-white"
            />
          </div>
          <input
            type="text"
            name="resumeUrl"
            placeholder="Resume Link"
            value={form.resumeUrl}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder="Notes"
            className="w-full px-3 py-2 border rounded"
            rows={3}
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Job Description"
            className="w-full px-3 py-2 border rounded"
            rows={3}
          />
          <button className="w-full bg-yellow-300 text-black py-2 rounded">
            Add Job
          </button>
        </form>
      </div>
    </div>
  );
}
