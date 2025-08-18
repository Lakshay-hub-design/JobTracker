import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useAuth } from "../context/AuthContex";
import Navbar from "../components/Navbar";
import { useTheme } from "../context/ThemeContext";

const Profile = () => {
  const {user, logout} = useAuth();
  const { darkMode, toggleTheme } = useTheme();
  const [profile, setProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
    address: "",
    country: "",
    dob: "",
    phone: "",
    nationality: "",
    position: "",
    workPermit: "",
    bio: "",
    socials: [],
    skills: [],
    languages: [],
    jobSearchAreas: [],
  });

  return (
    <>
    <Navbar darkMode={darkMode} toggleTheme={toggleTheme} logout={logout} />
    <div className="min-h-screen bg-gray-50 dark:bg-black dark:text-white p-8">
      <h1 className="text-3xl font-bold border-b-4 border-yellow-400 w-fit mb-8">
        Personal Information
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT COLUMN */}
        <div className="space-y-6">
          {/* Personal Info */}
          <div>
            <h2 className="text-xl font-semibold flex items-center gap-2">
              {profile.name}
              <Pencil size={16} className="cursor-pointer text-blue-500" />
            </h2>
            <p className="text-gray-600 dark:text-gray-400">Email: {profile.email}</p>
            <p>Address: {profile.address || "-"}</p>
            <p>Country: {profile.country || "-"}</p>
            <p>Date of Birth: {profile.dob || "-"}</p>
            <p>Phone: {profile.phone || "-"}</p>
            <p>Nationality: {profile.nationality || "-"}</p>
          </div>

          {/* Professional Profile */}
          <div>
            <h2 className="text-xl font-semibold flex items-center gap-2">
              Professional Profile
              <Pencil size={16} className="cursor-pointer text-blue-500" />
            </h2>
            <p>Actual Position: {profile.position || "-"}</p>
            <p>Working Permit: {profile.workPermit || "-"}</p>
            <p>Bio: {profile.bio || "-"}</p>
          </div>
        </div>

        {/* CENTER AVATAR CARD */}
        <div className="flex justify-center items-center">
          <div className="bg-white dark:bg-[#1e1e1e] shadow-md rounded-lg p-6 text-center w-72">
            <div className="bg-gray-800 text-white rounded-full w-28 h-28 flex items-center justify-center mx-auto text-3xl font-bold">
              {profile.name?.charAt(0).toUpperCase()}
              {profile.name?.split(" ")[1]?.charAt(0).toUpperCase()}
            </div>
            <p className="mt-3 text-sm text-gray-500">0% Profile details</p>
            <p className="text-blue-500 cursor-pointer">100% missing</p>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold flex items-center gap-2">
              Socials <Pencil size={16} className="cursor-pointer text-blue-500" />
            </h2>
            {profile.socials.length > 0 ? (
              <ul className="list-disc pl-5">
                {profile.socials.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No socials set yet</p>
            )}
          </div>

          <div>
            <h2 className="text-lg font-semibold flex items-center gap-2">
              Skills <Pencil size={16} className="cursor-pointer text-blue-500" />
            </h2>
            {profile.skills.length > 0 ? (
              <ul className="list-disc pl-5">
                {profile.skills.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No skills set yet</p>
            )}
          </div>

          <div>
            <h2 className="text-lg font-semibold flex items-center gap-2">
              Languages <Pencil size={16} className="cursor-pointer text-blue-500" />
            </h2>
            {profile.languages.length > 0 ? (
              <ul className="list-disc pl-5">
                {profile.languages.map((l, i) => (
                  <li key={i}>{l}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No languages set yet</p>
            )}
          </div>

          <div>
            <h2 className="text-lg font-semibold flex items-center gap-2">
              Job Search Areas <Pencil size={16} className="cursor-pointer text-blue-500" />
            </h2>
            {profile.jobSearchAreas.length > 0 ? (
              <ul className="list-disc pl-5">
                {profile.jobSearchAreas.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No job search areas set yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Profile;
