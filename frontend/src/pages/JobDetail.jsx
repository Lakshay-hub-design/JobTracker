import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContex";
import { Building, Link2, FileText, User, Trash2, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import EditJob from "./EditJob";

export default function JobDetail() {
  const { id } = useParams();
  const { token } = useAuth();
  const [job, setJob] = useState(null);
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);

  const handleOpenModal = (jobId) => {
    setIsModalOpen(true);
    setSelectedJobId(jobId);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const fetchJob = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/jobs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJob(res.data);
      setNotes(res.data.notes || "");
    } catch (error) {
      console.error("Failed to fetch job", error);
    }
  };

  useEffect(() => {
    fetchJob();
  }, [id, token]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this application?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/jobs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Job deleted!");
      navigate("/dashboard");
    } catch (err) {
      toast.error("Error deleting job");
    }
  };

  const handleNotesSave = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BASE_URL}/jobs/${id}`,
        { notes },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Notes updated successfully");
    } catch (error) {
      console.error("Failed to update notes", error);
    }
  };

  const handleFileUpload = async (e, field) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URLL}/jobs/${id}/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setJob((prev) => ({ ...prev, [field]: res.data.url }));
      alert(`${field} uploaded successfully`);
    } catch (err) {
      console.error(`Failed to upload ${field}`, err);
    }
  };

  if (!job) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Left Column - Job Info */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{job.position}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-2">
            <Building size={18} /> <span>{job.company}</span>
          </div>
          <p><strong>Location:</strong> {job.location || "Not specified"}</p>
          <p><strong>Job Type:</strong> {job.jobType}</p>
          <p><strong>Workload:</strong> {job.workload || "N/A"}</p>
          <p><strong>Published:</strong> {new Date(job.createdAt).toLocaleDateString()}</p>
          {job.source && (
            <p className="flex items-center gap-2">
              <Link2 size={18} />
              <a href={job.source} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                {job.source}
              </a>
            </p>
          )}
          <Separator />
          <div>
            <h2 className="font-semibold mb-2">Description</h2>
            <p>{job.description || "No description provided"}</p>
          </div>
        </CardContent>
      </Card>

      {/* Right Column - Application Details */}
      <Card className="shadow-md">
        <CardContent className="space-y-4 pt-6">

          {/* Notes */}
          <div>
            <h2 className="font-semibold flex items-center gap-2">
              <FileText size={18} /> Notes
            </h2>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="mt-2"
            />
            <Button className="mt-2" size="sm" onClick={handleNotesSave}>
              Save Notes
            </Button>
          </div>

          {/* Cover Letter & CV */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold">📧 Cover Letter</h3>
              <div className="flex gap-2 mt-2">
                <input
                  type="file"
                  className="hidden"
                  id="coverLetterInput"
                  onChange={(e) => handleFileUpload(e, "coverLetter")}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => document.getElementById("coverLetterInput").click()}
                >
                  Upload
                </Button>
                {job.coverLetter && (
                  <a href={job.coverLetter} target="_blank" rel="noreferrer">
                    <Button size="sm">View</Button>
                  </a>
                )}
              </div>
            </div>
            <div>
              <h3 className="font-semibold">📄 CV - Resume</h3>
              <div className="flex gap-2 mt-2">
                <input
                  type="file"
                  className="hidden"
                  id="resumeInput"
                  onChange={(e) => handleFileUpload(e, "resume")}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => document.getElementById("resumeInput").click()}
                >
                  Upload
                </Button>
                {job.resume && (
                  <a href={job.resume} target="_blank" rel="noreferrer">
                    <Button size="sm">View</Button>
                  </a>
                )}
              </div>
            </div>
          </div>
          {isModalOpen && (
                  <>
                    {/* Overlay */}
                    <div className="fixed inset-0 z-40" onClick={handleCloseModal}></div>
          
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
                        <EditJob onClose={handleCloseModal} fetchJobs={fetchJob} jobId={selectedJobId} />
                      </div>
                    </div>
                  </>
                )}

          {/* Edit & Delete */}
          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={() => handleOpenModal(job._id)}>
              <Pencil className="mr-2" size={16} /> Edit Application
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              <Trash2 className="mr-2" size={16} /> Delete Application
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
