// src/pages/Profile.jsx

import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContex";
import { useTheme } from "../../context/ThemeContext";
import { toast } from "sonner";
import axios from "axios";
import Navbar from "../../components/dashboard/Navbar";
import ProfileLeft from "../../components/ProfileComps/ProfileLeft";
import ProfileImage from "../../components/ProfileComps/ProfileImage";
// It's good practice to have a reusable loading component
// import LoadingSpinner from "../components/ui/LoadingSpinner"; 

const Profile = () => {
  const { token, logout } = useAuth();
  const { darkMode, toggleTheme } = useTheme();

  // 1. Initialize profile as null and add loading/error states
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. useEffect now controls the loading and error states
  useEffect(() => {
    const fetchUser = async () => {
      // Ensure token exists before fetching
      if (!token) {
        setIsLoading(false);
        setError("You are not authenticated.");
        toast.error("Authentication token not found.");
        return;
      }

      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch user data. Please try refreshing the page.");
        toast.error("Failed to fetch user data");
      } finally {
        // This runs regardless of success or failure
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [token]); // The effect depends only on the token

  // 3. Conditionally render based on the loading and error states
  if (isLoading) {
    return (
      <>
        <Navbar darkMode={darkMode} toggleTheme={toggleTheme} logout={logout} />
        {/* You can replace this with a more sophisticated skeleton screen */}
        <div className="flex justify-center items-center min-h-screen">
          <p>Loading Profile...</p> 
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar darkMode={darkMode} toggleTheme={toggleTheme} logout={logout} />
        <div className="flex justify-center items-center min-h-screen text-red-500">
          <p>{error}</p>
        </div>
      </>
    );
  }
  
  // This content will only be rendered after loading is false and there's no error
  return (
    <>
      <Navbar darkMode={darkMode} toggleTheme={toggleTheme} logout={logout} />
      <div className="min-h-screen bg-gray-50 dark:bg-black dark:text-white p-8">
        <h1 className="text-3xl font-bold border-b-4 border-yellow-400 w-fit mb-8">
          Personal Information
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 
            The child components receive the `profile` data, which is now guaranteed to be populated.
            The update logic inside them will work as before.
          */}
          <ProfileLeft profile={profile} setProfile={setProfile} />
          <ProfileImage profile={profile} setProfile={setProfile} />
        </div>
      </div>
    </>
  );
};

export default Profile;
