import React, { useRef, useState } from "react";
import { FileUp } from "lucide-react";
import { useAddJob } from "../hooks/useAddJob";
import { useNavigate } from "react-router-dom";

const AddJobPage = () => {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    company: "",
    position: "",
    status: "applied",
    jobType: "full-time",
    workplace: "onsite",
    location: "",
    appliedDate: "",
    followUpDate: "",
    description: "",
    notes: "",
  });

  const { handleAddApplication, loading } = useAddJob();

  const [errors, setErrors] = useState({});

  const [showConfirm, setShowConfirm] = useState(false);

  const [file, setFile] = useState(null);

  const validate = () => {
    const newErrors = {};

    if (!formData.company.trim()) {
      newErrors.company = "Company is required";
    }

    if (!formData.position.trim()) {
      newErrors.position = "Position is required";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (!file || !formData.description) {
      setShowConfirm(true);
      return;
    }

    proceedSubmit();
  };

  const proceedSubmit = () => {
    const form = new FormData();

    for (let key in formData) {
      form.append(key, formData[key]);
    }

    if (file) {
      form.append("resume", file);
    }
    for (let pair of form.entries()) {
      console.log(pair[0], pair[1]);
    }
    handleAddApplication(form);
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-">Add New Application</h2>
        <p className="text-gray-500 text-sm">
          Fill in the details for the new job opportunity to keep your pipeline
          organized.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
        <div className="bg-white dark:bg-[#1e1b1a] flex flex-col justify-between w-full md:w-3/5 col-span-3 p-4 rounded-2xl shadow-sm">
          <div className="flex flex-col md:flex-row justify-between md:gap-6 space-y-4">
            <div className="flex flex-col w-full">
              <label
                htmlFor="company"
                className="font-bold text-gray-800 dark:text-[#95756a] mb-2"
              >
                Company
              </label>
              <input
                type="text"
                id="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="e.g. Google, Stripe, Airbnb"
                className={`border rounded-md bg-gray-100 dark:border-none dark:bg-[#2f2929] py-2 px-4 ${
                  errors.company ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.company && (
                <p className="text-red-500 text-sm mt-1">{errors.company}</p>
              )}
            </div>
            <div className="flex flex-col w-full">
              <label
                htmlFor="position"
                className="font-bold text-gray-800 dark:text-[#95756a] mb-2"
              >
                Position
              </label>
              <input
                type="text"
                id="position"
                value={formData.position}
                onChange={handleChange}
                placeholder="e.g. Senior Product Designer"
                className={`border rounded-md bg-gray-100 dark:border-none dark:bg-[#2f2929] py-2 px-4 ${
                  errors.company ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.location && (
                <p className="text-red-500 text-sm mt-1">{errors.position}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 md:gap-6 space-y-4 mt-4 md:mt-0">
            <div className="flex flex-col w-full">
              <label
                htmlFor="status"
                className="font-bold text-gray-800 dark:text-[#95756a] mb-2"
              >
                Status
              </label>
              <select
                name=""
                id="status"
                value={formData.status}
                onChange={handleChange}
                className="py-2 px-4 border border-gray-300 rounded-md font-medium text-[#424241] dark:text-[#8e8989] bg-gray-100 dark:border-none dark:bg-[#2f2929] focus:outline-none"
              >
                <option value="applied">Applied</option>
                <option value="interviewing">Interviewing</option>
                <option value="offered">Offered</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <div className="flex flex-col w-full">
              <label
                htmlFor="jobType"
                className="font-bold text-gray-800 dark:text-[#95756a] mb-2"
              >
                Job Type
              </label>
              <select
                id="jobType"
                value={formData.jobType}
                onChange={handleChange}
                className="py-2 px-4 border border-gray-300 rounded-md font-medium text-[#424241] dark:text-[#8e8989] bg-gray-100 dark:border-none dark:bg-[#2f2929] focus:outline-none"
              >
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="internship">Internship</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 md:gap-6 space-y-4">
            <div className="flex flex-col w-full">
              <label
                htmlFor="location"
                className="font-bold text-gray-800 dark:text-[#95756a] mb-2"
              >
                Location
              </label>
              <input
                type="text"
                id="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Banglore, India"
                className={`border rounded-md bg-gray-100 py-2 dark:border-none dark:bg-[#2f2929] px-4 ${
                  errors.company ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.location && (
                <p className="text-red-500 text-sm mt-1">{errors.location}</p>
              )}
            </div>
            <div className="flex flex-col w-full">
              <label
                htmlFor="workplace"
                className="font-bold text-gray-800  dark:text-[#95756a] mb-2"
              >
                Workplace
              </label>
              <select
                id="workplace"
                value={formData.workplace}
                onChange={handleChange}
                className="py-2 px-4 border border-gray-300 rounded-md font-medium text-[#424241] dark:text-[#8e8989] bg-gray-100 dark:border-none dark:bg-[#2f2929] focus:outline-none"
              >
                <option value="onsite">Onsite</option>
                <option value="remote">Remote</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 md:gap-6 space-y-4">
            <div className="flex flex-col w-full">
              <label
                htmlFor="appliedDate"
                className="font-bold text-gray-800 dark:text-[#95756a] mb-2"
              >
                Applied Date
              </label>
              <input
                type="date"
                id="appliedDate"
                value={formData.appliedDate}
                onChange={handleChange}
                className="border border-gray-300 rounded-md bg-gray-100 dark:border-none dark:bg-[#2f2929] py-2 px-4 focus:outline-none"
              />
            </div>
            <div className="flex flex-col w-full">
              <label
                htmlFor="followUpDate"
                className="font-bold text-gray-800 dark:text-[#95756a] mb-2"
              >
                Follow-up Date
              </label>
              <input
                type="date"
                id="followUpDate"
                value={formData.followUpDate}
                onChange={handleChange}
                className="border border-gray-300 rounded-md bg-gray-100 dark:border-none dark:bg-[#2f2929] py-2 px-4 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col w-full">
            <label
              htmlFor="description"
              className="font-bold text-gray-800 dark:text-[#95756a] mb-2"
            >
              Description
            </label>
            <textarea
              name=""
              id="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter job description..."
              className={`border dark:border-none rounded-md bg-gray-100 dark:bg-[#2f2929] py-2 px-4 resize-none h-32 `}
            ></textarea>
          </div>

          <div className="hidden md:flex gap-6 justify-end mt-6">
            <button
              onClick={() => navigate("/jobs")}
              className="text-amber-800 font-medium cursor-pointer hover:underline"
            >
              Cancel
            </button>
            <button
              disabled={loading}
              onClick={handleSubmit}
              className="px-6 py-3 bg-[#C03E0A] rounded-full text-white font-medium cursor-pointer active:scale-95 transition hover:bg-amber-600"
            >
              {loading ? "Adding..." : "Add Application"}
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-[#1e1b1a] w-full md:w-2/5 p-6 flex col-span-2 rounded-2xl shadow-sm flex-col">
          <label
            htmlFor=""
            className="font-bold text-gray-800 dark:text-[#95756a] mb-2"
          >
            Resume
          </label>
          <div className="border-2 border-dashed border-amber-800/20 p-4 rounded-md bg-gray-100 dark:bg-[#2F2929] flex flex-col items-center justify-center">
            <div className="h-16 w-16 bg-[#F8E0D8] rounded-full flex items-center justify-center mb-4">
              <FileUp className="text-amber-800" />
            </div>
            {file ? (
              <p className="text-sm text-green-600 mt-2">
                Uploaded: {file.name}
              </p>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <h3 className="font-medium text-lg text-gray-800 dark:text-[#a78989]">
                  Upload your latest resume
                </h3>
                <p className="text-center mb-6 text-sm text-gray-700 dark:text-[#787171]">
                  PDF, DOCX up to 10MB. We'll automatically parse key <br />{" "}
                  details for you.
                </p>

                <div
                  onClick={handleClick}
                  className="py-2 px-4 rounded-full bg-gray-200 dark:bg-orange-100 hover:scale-105 transition cursor-pointer"
                >
                  <h3 className="font-medium dark:text-[#474242]">
                    Choose File
                  </h3>
                </div>
              </div>
            )}
          </div>
          <input
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            type="file"
          />
          <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200">
            <div className="flex items-start gap-3">
              <div className="text-xl">🤖</div>

              <div>
                <p className="font-semibold text-orange-700">
                  Unlock AI Interview Insights
                </p>
                <p className="text-sm text-gray-700 mt-1">
                  Add a job description and upload your resume to generate
                  personalized interview questions, skill gaps, and preparation
                  tips.
                </p>
                <p className="text-xs text-orange-600 mt-2">
                  ⚡ AI report will be generated automatically after submission
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col w-full mt-6">
            <label
              htmlFor="notes"
              className="font-bold text-gray-800 dark:text-[#95756a] mb-2"
            >
              Notes
            </label>
            <textarea
              name=""
              id="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Personal notes, research, networking contacts, etc."
              className=" py-2 px-4 rounded-md bg-gray-100 dark:bg-[#2F2929] resize-none h-30"
            ></textarea>
          </div>

          <div className="w-full md:hidden mt-4 flex  gap-3">
            <button
              onClick={() => navigate("/jobs")}
              className="flex-1 py-3 rounded-full border border-orange-600 text-orange-600 font-medium"
            >
              Cancel
            </button>

            <button
              disabled={loading}
              onClick={handleSubmit}
              className="flex-1 py-3 rounded-full bg-orange-600 text-white font-medium"
            >
              {loading ? "Adding..." : "Add"}
            </button>
          </div>
        </div>

        {showConfirm && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-[400px] shadow-lg">
              <h3 className="text-lg font-semibold mb-2">
                🤖 AI Insights Not Available
              </h3>

              <p className="text-sm text-gray-600 mb-4">
                You haven’t added a job description or resume. AI report won’t
                be generated for this job.
              </p>

              <p className="text-sm text-orange-600 mb-6">
                You can still add them later to generate insights.
              </p>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="px-4 py-2 border rounded-lg"
                >
                  Go Back
                </button>

                <button
                  onClick={() => {
                    setShowConfirm(false);
                    proceedSubmit(); // 👈 real submit function
                  }}
                  className="px-4 py-2 bg-orange-600 text-white rounded-lg"
                >
                  Continue Anyway
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddJobPage;
