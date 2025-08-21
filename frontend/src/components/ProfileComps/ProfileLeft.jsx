import React from 'react'
import { Button } from "@/components/ui/button";
import { Camera, Pencil } from "lucide-react";
import axios from "axios";
import { useState } from 'react';
import { useAuth } from '../../context/AuthContex';
import { toast } from 'sonner';

const ProfileLeft = ({ profile, setProfile }) => {
      const [isEditing, setIsEditing] = useState(false);
      const [isEditingProfessional, setIsEditingProfessional] = useState(false);
      const [originalProfile, setOriginalProfile] = useState(profile);
      const { token } = useAuth()

      const handleEditClick = () => {
        setOriginalProfile(profile);
        setIsEditing(true);
      };
    
      const handleCancel = () => {
        setProfile(originalProfile); // Restore the original state
        setIsEditing(false);
      };

const handleSave = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        "http://localhost:4000/api/user/profile",
        profile,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // --- Handlers for Professional Profile Section ---
  const handleProfessionalEditClick = () => {
    setOriginalProfile(profile); // Backup current data
    setIsEditingProfessional(true);
  };

  const handleProfessionalSave = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        "http://localhost:4000/api/user/profile",
        profile,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsEditingProfessional(false);
      toast.success("Professional profile updated successfully!");
    } catch (error) {
      console.error("Error saving professional profile:", error);
    }
  };

  const handleProfessionalCancel = () => {
    setProfile(originalProfile); // Restore from backup
    setIsEditingProfessional(false);
  };
  return (
    <div className="space-y-6">
            {/* Personal Info */}
            {isEditing ? (
              // EDITING VIEW (THE FORM)
              <div className="flex mb-4">
                <form onSubmit={handleSave} className="w-full">
                  <h2 className="text-xl font-semibold mb-4">
                    Edit Your Details
                  </h2>

                  {/* Name */}
                  <label className="mb-1 text-sm font-semibold text-gray-600 dark:text-gray-400">
                    Name
                  </label>
                  <input
                    name="username"
                    value={profile.username}
                    onChange={handleInputChange}
                    className="p-2 border rounded-md w-full bg-gray-100 dark:bg-gray-800 dark:border-gray-600 
                     focus:outline-none focus:ring-2 focus:ring-yellow-400 disabled:cursor-not-allowed"
                  />

                  {/* Email */}
                  <label className="mb-1 text-sm font-semibold text-gray-600 dark:text-gray-400">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={profile.email}
                    onChange={handleInputChange}
                    className="p-2 border rounded-md w-full bg-gray-100 dark:bg-gray-800 dark:border-gray-600 
                     focus:outline-none focus:ring-2 focus:ring-yellow-400 disabled:cursor-not-allowed"
                  />

                  {/* Repeat same pattern for other fields */}
                  {/* Address */}
                  <label className="mb-1 text-sm font-semibold text-gray-600 dark:text-gray-400">
                    Address
                  </label>
                  <input
                    name="address"
                    value={profile.address}
                    onChange={handleInputChange}
                    className="p-2 border rounded-md w-full bg-gray-100 dark:bg-gray-800 dark:border-gray-600 
                     focus:outline-none focus:ring-2 focus:ring-yellow-400 disabled:cursor-not-allowed"
                  />

                  {/* Country */}
                  <label className="mb-1 text-sm font-semibold text-gray-600 dark:text-gray-400">
                    Country
                  </label>
                  <input
                    name="country"
                    value={profile.country}
                    onChange={handleInputChange}
                    className="p-2 border rounded-md w-full bg-gray-100 dark:bg-gray-800 dark:border-gray-600 
                     focus:outline-none focus:ring-2 focus:ring-yellow-400 disabled:cursor-not-allowed"
                  />

                  {/* DOB */}
                  <label className="mb-1 text-sm font-semibold text-gray-600 dark:text-gray-400">
                    Date of Birth
                  </label>
                  <input
                    name="dob"
                    type="date"
                    value={profile.dob ? profile.dob.split("T")[0] : ""}
                    onChange={handleInputChange}
                    className="p-2 border rounded-md w-full bg-gray-100 dark:bg-gray-800 dark:border-gray-600 
                     focus:outline-none focus:ring-2 focus:ring-yellow-400 disabled:cursor-not-allowed"
                  />

                  {/* Phone */}
                  <label className="mb-1 text-sm font-semibold text-gray-600 dark:text-gray-400">
                    Phone
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    value={profile.phone}
                    onChange={handleInputChange}
                    className="p-2 border rounded-md w-full bg-gray-100 dark:bg-gray-800 dark:border-gray-600 
                     focus:outline-none focus:ring-2 focus:ring-yellow-400 disabled:cursor-not-allowed"
                  />

                  {/* Nationality */}
                  <label className="mb-1 text-sm font-semibold text-gray-600 dark:text-gray-400">
                    Nationality
                  </label>
                  <input
                    name="nationality"
                    value={profile.nationality}
                    onChange={handleInputChange}
                    className="p-2 border rounded-md w-full bg-gray-100 dark:bg-gray-800 dark:border-gray-600 
                     focus:outline-none focus:ring-2 focus:ring-yellow-400 disabled:cursor-not-allowed"
                  />

                  {/* Buttons */}
                  <div className="flex gap-4 mt-4">
                    <Button type="submit">Save</Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </div>
            ) : (
              // DISPLAY VIEW
              <div>
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  {profile.username || "Unnamed User"}
                  <Pencil
                    size={16}
                    className="cursor-pointer text-blue-500"
                    onClick={handleEditClick}
                  />
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Email: {profile.email}
                </p>
                <p>Address: {profile.address || "-"}</p>
                <p>Country: {profile.country || "-"}</p>
                <p>Date of Birth: {profile.dob || "-"}</p>
                <p>Phone: {profile.phone || "-"}</p>
                <p>Nationality: {profile.nationality || "-"}</p>
              </div>
            )}

            {/* Professional Profile */}
            {isEditingProfessional ? (
              <form onSubmit={handleProfessionalSave} className="w-full">
                <h2 className="text-xl font-semibold mb-4">
                  Edit Professional Profile
                </h2>

                {/* Actual Position */}
                <label className="mb-1 text-sm font-semibold text-gray-600 dark:text-gray-400">
                  Actual Position
                </label>
                <input
                  name="position"
                  value={profile.position || ""}
                  onChange={handleInputChange}
                  className="p-2 mb-3 border rounded-md w-full bg-gray-100 dark:bg-gray-800 dark:border-gray-600
                   focus:outline-none focus:ring-2 focus:ring-yellow-400 disabled:cursor-not-allowed"
                />

                {/* Working Permit */}
                <label className="mb-1 text-sm font-semibold text-gray-600 dark:text-gray-400">
                  Working Permit
                </label>
                <input
                  name="workPermit"
                  value={profile.workPermit || ""}
                  onChange={handleInputChange}
                  className="p-2 mb-3 border rounded-md w-full bg-gray-100 dark:bg-gray-800 dark:border-gray-600
                   focus:outline-none focus:ring-2 focus:ring-yellow-400 disabled:cursor-not-allowed"
                />

                {/* Bio */}
                <label className="mb-1 text-sm font-semibold text-gray-600 dark:text-gray-400">
                  Bio
                </label>
                <textarea
                  name="bio"
                  rows="4"
                  value={profile.bio || ""}
                  onChange={handleInputChange}
                  className="p-2 mb-3 border rounded-md w-full bg-gray-100 dark:bg-gray-800 dark:border-gray-600
                   focus:outline-none focus:ring-2 focus:ring-yellow-400 disabled:cursor-not-allowed"
                />

                {/* Buttons */}
                <div className="flex gap-4 mt-4">
                  <Button type="submit">Save</Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleProfessionalCancel}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            ) : (
              <div>
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  Professional Profile
                  <Pencil
                    size={16}
                    className="cursor-pointer text-blue-500"
                    onClick={handleProfessionalEditClick}
                  />
                </h2>
                <p>Actual Position: {profile.position || "-"}</p>
                <p>Working Permit: {profile.workPermit || "-"}</p>
                <p>Bio: {profile.bio || "-"}</p>
              </div>
            )}
          </div>
  )
}

export default ProfileLeft