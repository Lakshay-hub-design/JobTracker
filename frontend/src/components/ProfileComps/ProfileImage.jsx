import React, { useState, useRef } from "react";
import axios from "axios";
import { Buffer } from "buffer";
import { Camera } from "lucide-react";
import { useAuth } from "../../context/AuthContex";

const ProfileImage = ({ profile, setProfile}) => {

    const {token} = useAuth();
  const fileInputRef = useRef(null);

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("profileImage", file);

      try {
        const res = await axios.put(
          `http://localhost:4000/api/user/profile/image`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Update profile state from parent
        setProfile((prev) => ({
          ...prev,
          profileImage: res.data.profileImage,
        }));
      } catch (err) {
        console.error("❌ Upload error:", err.response?.data || err.message);
        alert("Image upload failed. Try again.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white dark:bg-[#1e1e1e] shadow-md rounded-lg p-6 text-center w-72">
        <div className="relative w-28 h-28 mx-auto">
          {/* Profile Circle */}
          {profile?.profileImage ? (
            <img
              src={`data:image/png;base64,${profile.profileImage}`}
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
            className="absolute bottom-1 right-1 bg-blue-500 p-2 rounded-full cursor-pointer shadow-md hover:bg-blue-600 transition"
          >
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

export default ProfileImage;
