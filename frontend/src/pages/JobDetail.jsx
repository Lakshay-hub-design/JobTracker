import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContex";
import { Building, Link2, FileText, Trash2, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import EditJob from "./EditJob";
import Navbar from "../components/Navbar";

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
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/jobs/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setJob(res.data);
      setNotes(res.data.notes || "");
    } catch (error) {
      console.error("Failed to fetch job", error);
      toast.error("Failed to load job details.");
    }
  };

  useEffect(() => {
    fetchJob();
  }, [id, token]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this application?"))
      return;
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
      toast.success("Notes updated successfully");
    } catch (error) {
      toast.error("Failed to update notes");
      console.error("Failed to update notes", error);
    }
  };

  // NOTE: I see a typo in your original code here: VITE_BASE_URLL (extra L).
  // I've corrected it to VITE_BASE_URL.
  const handleFileUpload = async (e, field) => {
    const file = e.target.files[0];
    if (!file) return;

    // Optional: Add file size check
    if (file.size > 5 * 1024 * 1024) {
      // 5MB limit
      toast.error("File is too large. Maximum size is 5MB.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    toast.info(`Uploading ${field}...`);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/jobs/${id}/upload`, // Corrected typo
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setJob((prev) => ({ ...prev, [field]: res.data.url }));
      toast.success(
        `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } uploaded successfully`
      );
      fetchJob(); // Re-fetch to ensure data is fresh
    } catch (err) {
      console.error(`Failed to upload ${field}`, err);
      // Handle potential 413 Payload Too Large error specifically
      if (err.response && err.response.status === 413) {
        toast.error("Upload failed: The file is too large.");
      } else {
        toast.error(`Failed to upload ${field}`);
      }
    }
  };

  if (!job) return <div className="p-6 text-center">Loading...</div>;

  return (
    <div>
      <Navbar />
      <div className="p-4 md:p-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Job Info */}
        <Card className="shadow-md">
          <CardHeader>
            {/* 2. Responsive title size */}
          <CardTitle className="text-2xl lg:text-3xl font-bold">
            {job.position}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Building size={18} /> <span>{job.company}</span>
          </div>
          <p>
            <strong>Location:</strong> {job.location || "Not specified"}
          </p>
          <p>
            <strong>Job Type:</strong> {job.jobType}
          </p>
          <p>
            <strong>Workload:</strong> {job.workload || "N/A"}
          </p>
          <p>
            <strong>Published:</strong>{" "}
            {new Date(job.createdAt).toLocaleDateString()}
          </p>
          {job.source && (
            <div className="flex items-start gap-2">
              <Link2 size={18} className="mt-1 flex-shrink-0" />
              {/* 3. Added truncate to prevent long links from overflowing */}
              <a
                href={job.source}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline break-all"
              >
                {job.source}
              </a>
            </div>
          )}
          <Separator />
          <div>
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-muted-foreground whitespace-pre-wrap">
              {job.description || "No description provided."}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Right Column - Application Details */}
      <div className="space-y-6 mb-15">
        <Card className="shadow-md">
          <CardContent className="space-y-6 pt-6">
            {/* Notes */}
            <div>
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <FileText size={18} /> Notes
              </h2>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="mt-2"
                placeholder="Add your notes here..."
                rows={5}
              />
              <Button className="mt-2" size="sm" onClick={handleNotesSave}>
                Save Notes
              </Button>
            </div>

            <Separator />

            {/* Cover Letter & CV */}
            {/* 4. Responsive grid for file uploads */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold">📧 Cover Letter</h3>
                <div className="flex gap-2 mt-2">
                  <input
                    type="file"
                    className="hidden"
                    id="coverLetterInput"
                    onChange={(e) => handleFileUpload(e, "coverLetter")}
                    accept=".pdf,.doc,.docx"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      document.getElementById("coverLetterInput").click()
                    }
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
                <h3 className="font-semibold">📄 CV / Resume</h3>
                <div className="flex gap-2 mt-2">
                  <input
                    type="file"
                    className="hidden"
                    id="resumeInput"
                    onChange={(e) => handleFileUpload(e, "resume")}
                    accept=".pdf,.doc,.docx"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      document.getElementById("resumeInput").click()
                    }
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
            <div className="flex flex-col sm:flex-row sm:justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => handleOpenModal(job._id)}
              >
                <Pencil className="mr-2" size={16} /> Edit
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                <Trash2 className="mr-2" size={16} /> Delete
              </Button>
            </div>
          </CardContent>
        </Card>
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
              className="bg-background rounded-lg shadow-xl p-6 w-full max-w-lg relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
                onClick={handleCloseModal}
              >
                &times;
              </button>
              <EditJob
                onClose={handleCloseModal}
                fetchJobs={fetchJob}
                jobId={selectedJobId}
              />
            </div>
          </div>
        </>
      )}
    </div>
    </div>
  );
}
