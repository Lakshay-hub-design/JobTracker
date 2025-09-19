import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useJobs } from "../../context/JobContext";

const EditJob = ({ job, onClose }) => {
  const {fetchJobs} = useJobs();
  const [formData, setFormData] = useState({
    position: "",
    company: "",
    location: "",
    status: "",
    appliedDate: "",
    notes: "",
    description: "",
    resumeUrl: "",
  });

  useEffect(() => {
    if (job) {
      setFormData({
        position: job.position || "",
        location: job.location || "",
        company: job.company || "",
        status: job.status || "",
        resumeUrl: job.resumeUrl || "", 
        appliedDate: job.appliedDate
          ? new Date(job.appliedDate).toISOString().split("T")[0]
          : "",
        notes: job.notes || "",
        description: job.description || "",
      });
    }
  }, [job]);

const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
const handleSubmit = async (e) =>{
  e.preventDefault();
  try{  
    await axios.put(`http://localhost:3000/api/job/${job._id}`, formData, {
      withCredentials: true
    });
    fetchJobs()
    onClose()
  } catch(err){
    console.error("Failed to update job", err)
  }
}

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm ">
      <div className="relative w-full max-w-xl p-6 bg-white dark:bg-[#232B2B] dark:text-white rounded-lg shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
        >
          &times;
        </button>
      <h3 className="text-xl font-semibold mb-4">Edit Job</h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input name="company" value={formData.company} onChange={handleChange}
               placeholder="Company" className="w-full px-3 py-2 border rounded" required />
        <input name="position" value={formData.position} onChange={handleChange}
               placeholder="Position" className="w-full px-3 py-2 border rounded" required />
        <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} className="w-full border p-2 rounded" />
        <div className="flex gap-3">
          <select name="status" value={formData.status} onChange={handleChange} className="flex-1 px-3 py-2 border rounded">
            <option value="applied">Applied</option>
            <option value="interview">Interview</option>
            <option value="offer">Offer</option>
            <option value="rejected">Rejected</option>
          </select>
          <select name="jobType" value={formData.jobType} onChange={handleChange} className="flex-1 px-3 py-2 border rounded">
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="internship">Internship</option>
            <option value="remote">Remote</option>
          </select>
        </div>
         <input type="text" name="resumeUrl" placeholder="Resume Link" value={formData.resumeUrl} onChange={handleChange} className="w-full border p-2 rounded" />
        <textarea name="notes" value={formData.notes} onChange={handleChange}
                  placeholder="Notes" className="w-full px-3 py-2 border rounded" rows={4} />
        <textarea name="description" value={formData.description} onChange={handleChange}
                  placeholder="Job Description" className="w-full px-3 py-2 border rounded" rows={4} />
        <button className="w-full bg-yellow-300 text-black py-2 rounded">Update Job</button>
      </form>
    </div>
    </div>
  )
  
};

export default EditJob;
