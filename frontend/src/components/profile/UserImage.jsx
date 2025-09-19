import axios from "axios";
import { Camera } from "lucide-react";
import React, { useRef, useState } from "react";
import { useEffect } from "react";

const UserImage = () => {
  const [profile, setprofile] = useState({});
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try{
        const res = await axios.get('http://localhost:3000/api/profile/me',
          {withCredentials: true}
        )
        setprofile(res.data.user)
      } catch(err){
        console.log("Error fetching profile", err)
      }
    }

    fetchProfile()
  }, [])
  

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if(!file) return;

    try{
      const formData = new FormData();
      formData.append("profileImage", file);

      const res = await axios.post('http://localhost:3000/api/profile/image', formData,
        {withCredentials: true}
      )
      setprofile(res.data.profile)
    } catch(err){
      console.error("Upload failed:", err);
    }
  }
  
  return (
    <div className="flex justify-center items-center">
      <div className="bg-white shadow-md rounded-lg dark:bg-[#1E1E1E] p-6 text-center w-72">
        <div className="relative w-28 h-28 mx-auto">
          {/* Profile Circle */}
          {profile?.profileImage ? (
            <img
              src= {profile.profileImage}
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover border"
            />
          ) : (
            <div className="bg-gray-800 text-white rounded-full w-28 h-28 flex items-center justify-center text-3xl font-bold">
              {profile.username?.charAt(0).toUpperCase()}
              {profile.username?.split(" ")[1]?.charAt(0).toUpperCase()}
            </div>
          )}

          {/* Camera Icon Overlay */}
          <div 
          onClick={handleIconClick}
          className="absolute bottom-1 right-1 bg-blue-500 p-2 rounded-full cursor-pointer shadow-md hover:bg-blue-600 transition">
            <Camera className="text-white text-sm" />
          </div>

          {/* Hidden File Input */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            name="profileImage"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        <p className="mt-3 text-sm text-gray-500">0% Profile details</p>
        <p className="text-blue-500 cursor-pointer">100% missing</p>
      </div>
    </div>
  );
};

export default UserImage;
