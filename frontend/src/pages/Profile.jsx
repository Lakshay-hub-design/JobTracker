import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContex";
import Navbar from "../components/Navbar";
import { useTheme } from "../context/ThemeContext";
import { toast } from "sonner";
import axios from "axios";
import ProfileImage from "../components/ProfileComps/ProfileImage";
import { use } from "react";
import ProfileRight from "../components/ProfileComps/ProfileRight";
import ProfileLeft from "../components/ProfileComps/ProfileLeft";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const { token, user, logout } = useAuth();
  const { darkMode, toggleTheme } = useTheme();

  const [profile, setProfile] = useState({
    username: user?.name,
    email: user?.email,
    address: "",
    country: "",
    dob: "",
    phone: "",
    nationality: "",
    position: "",
    workPermit: "",
    bio: "",
    profileImage: "",
  });


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch user data");
      }
    };
    fetchUser();
  }, []);
  

  return (
    <>
      <Navbar darkMode={darkMode} toggleTheme={toggleTheme} logout={logout} />
      <div className="min-h-screen bg-gray-50 dark:bg-black dark:text-white p-8">
        <h1 className="text-3xl font-bold border-b-4 border-yellow-400 w-fit mb-8">
          Personal Information
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <ProfileLeft profile={profile} setProfile={setProfile} />

          <ProfileImage profile={profile} setProfile={setProfile} />
        </div>
      </div>
    </>
  );
};

export default Profile;