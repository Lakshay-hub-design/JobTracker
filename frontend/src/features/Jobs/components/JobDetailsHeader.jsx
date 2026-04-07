import { PiBuildingApartmentFill } from "react-icons/pi";
import { FaLocationDot } from "react-icons/fa6";
import { MdWatchLater } from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";
import { TbReportSearch } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}


const JobDetailsHeader = ({ job }) => {
    const navigate = useNavigate()
    if(!job) return null

  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="bg-white p-6 px-10 rounded-xl col-span-3 shadow-sm flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold">{job.position}</h2>
          <p className="text-gray-700 mt-1 text-lg capitalize font-semibold flex items-center gap-2">
            <PiBuildingApartmentFill className="text-orange-600" />
            {job.company}
          </p>

          <div className="flex items-center gap-4 mt-3 text-md text-gray-500">
            <span className="flex items-center gap-3">
              <FaLocationDot className="text-amber-900/80" /> {job.location}
            </span>
            <span className="flex items-center gap-3">
              <MdWatchLater className="text-amber-900/80"/> {job.jobType}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-end gap-3">
          <span
            className={`px-5 py-1 rounded-full text-sm font-medium ${
              job.status === "applied"
                ? "bg-blue-100 text-blue-600"
                : job.status === "interviewing"
                  ? "bg-yellow-100 text-yellow-600"
                  : job.status === "rejected"
                    ? "bg-red-100 text-red-600"
                    : "bg-green-100 text-green-600"
            }`}
          >
            {job.status}
          </span>

          <div className="flex gap-2">
            <button
            onClick={() => navigate(`/job/${job._id}/report`)}
            className="px-6 py-3 border rounded-full bg-gray-200 text-blue-700 font-medium flex items-center gap-2 cursor-pointer hover:bg-gray-100">
                <TbReportSearch />
              View AI Report
            </button>

            <button className="px-4 py-2 border rounded-full bg-gray-300 font-medium cursor-pointer hover:bg-gray-200">
              Update Status
            </button>
          </div>
        </div>
      </div>
      <div className="bg-gray-100 p-6 rounded-xl shadow-sm flex flex-col justify-between">
        <h3 className="uppercase font-medium text-sm text-gray-700">Applied Date</h3>
        <div className="flex items-center justify-between">
            <p className="text-2xl font-medium">{formatDate(job.appliedDate)}</p>
            <FaRegCalendarAlt size={20} className="text-orange-400" />
        </div>
      </div>
    </div>
    
  );
}

export default JobDetailsHeader
