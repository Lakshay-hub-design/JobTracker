import axios from "axios";
import { Pencil } from "lucide-react";
import React, { useState } from "react";
import { useEffect } from "react";

const UserInfo = () => {

  const [profile, setProfile] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try{
        const res = await axios.get('http://localhost:3000/api/profile/me',
          {withCredentials: true}
        )
        setProfile(res.data.user)
      } catch(err){
        console.log("Error fetching profile", err)
      }
    }

    fetchProfile()
  }, [])
  

  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [isEditingProfessional, setIsEditingProfessional] = useState(false);

  // handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSavePersonal = async () => {
    try{
      const res = await axios.post('http://localhost:3000/api/profile/user-info', 
        {
          username: profile.username,
          email: profile.email,
          address: profile.address,
          country: profile.country,
          dob: profile.dob,
          phone: profile.phone,
          nationality: profile.nationality,
        },
        {withCredentials: true}
      )
      setProfile(res.data.user)
      setIsEditingPersonal(false);
    } catch (err){
      console.error("Failed to update personal info", err);
    }
  };

  const handleSaveProfessional = async () => {
    
    try{
      const res = await axios.post('http://localhost:3000/api/profile/user-info',
        {
          position: profile.position,
          workPermit: profile.workPermit,
          bio: profile.bio
        },
        {withCredentials: true}
      )
      setProfile(res.data.user)
      setIsEditingProfessional(false);  
    }catch(err){
      console.error("Failed to update professional info", err);
    }
  };

  return (
    <div className="space-y-6 p-4">
      {/* Personal Info */}
      <div>
        {!isEditingPersonal ? (
          <>
            <h2 className="text-xl font-semibold flex items-center gap-2">
              {profile.username || "Unnamed User"}
              <Pencil
                size={16}
                className="cursor-pointer text-blue-500"
                onClick={() => setIsEditingPersonal(true)}
              />
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Email: {profile.email || "-"}
            </p>
            <p>Address: {profile.address || "-"}</p>
            <p>Country: {profile.country || "-"}</p>
            <p>Date of Birth: {profile.dob || "-"}</p>
            <p>Phone: {profile.phone || "-"}</p>
            <p>Nationality: {profile.nationality || "-"}</p>
          </>
        ) : (
          <div className="space-y-3 mt-4">
            <input
              type="text"
              name="username"
              value={profile.username}
              onChange={handleChange}
              placeholder="Username"
              className="w-full p-2 rounded text-black dark:bg-[#1E2939] dark:text-white bg-gray-200"
            />
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-2 rounded text-black dark:bg-[#1E2939] dark:text-white bg-gray-200"
            />
            <input
              type="text"
              name="address"
              value={profile.address || ""}
              onChange={(e) =>
                setProfile({...profile, address: e.target.value})
              }
              placeholder="Address"
              className="w-full p-2 rounded text-black dark:bg-[#1E2939] dark:text-white bg-gray-200"
            />
            <input
              type="text"
              name="country"
              value={profile.country || ""}
              onChange={(e) =>
                setProfile({...profile, country: e.target.value})
              }
              placeholder="Country"
              className="w-full p-2 rounded text-black dark:bg-[#1E2939] dark:text-white bg-gray-200"
            />
            <input
              type="date"
              name="dob"
              value={profile.dob || ""}
              onChange={(e) =>
                setProfile({...profile, dob: e.target.value})
              }
              className="w-full p-2 rounded text-black dark:bg-[#1E2939] dark:text-white bg-gray-200"
            />
            <input
              type="text"
              name="phone"
              value={profile.phone || ""}
              onChange={(e) =>
                setProfile({...profile, phone: e.target.value})
              }
              placeholder="Phone"
              className="w-full p-2 rounded text-black dark:bg-[#1E2939] dark:text-white bg-gray-200"
            />
            <input
              type="text"
              name="nationality"
              value={profile.nationality || ""}
              onChange={(e) =>
                setProfile({...profile, nationality: e.target.value})
              }
              placeholder="Nationality"
              className="w-full p-2 rounded text-black dark:bg-[#1E2939] dark:text-white bg-gray-200"
            />

            <div className="flex gap-2">
              <button
                onClick={handleSavePersonal}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditingPersonal(false)}
                className="px-4 py-2 bg-black text-white rounded dark:bg-[#1E2939] "
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Professional Profile */}
      <div>
        <h2 className="text-xl font-semibold flex items-center gap-2">
          Professional Profile
          <Pencil
            size={16}
            className="cursor-pointer text-blue-500"
            onClick={() => setIsEditingProfessional(true)}
          />
        </h2>

        {!isEditingProfessional ? (
          <>
            <p>Actual Position: {profile.position || "-"}</p>
            <p>Working Permit: {profile.workPermit || "-"}</p>
            <p>Bio: {profile.bio || "-"}</p>
          </>
        ) : (
          <div className="space-y-3 mt-4">
            <input
              type="text"
              name="position"
              value={profile.position || ""}
              onChange={(e) =>
                setProfile({...profile, position: e.target.value})
              }
              placeholder="Actual Position"
              className="w-full p-2 rounded text-black dark:bg-[#1E2939] dark:text-white bg-gray-200"
            />
            <input
              type="text"
              name="workPermit"
              value={profile.workPermit || ""}
              onChange={(e) =>
                setProfile({...profile, workPermit: e.target.value})
              }
              placeholder="Working Permit"
              className="w-full p-2 rounded text-black dark:bg-[#1E2939] dark:text-white bg-gray-200"
            />
            <textarea
              name="bio"
              value={profile.bio || ""}
              onChange={(e) =>
                setProfile({...profile, bio: e.target.value})
              }
              placeholder="Bio"
              className="w-full p-2 rounded text-black dark:bg-[#1E2939] dark:text-white bg-gray-200"
              rows="3"
            />

            <div className="flex gap-2">
              <button
                onClick={handleSaveProfessional}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditingProfessional(false)}
                className="px-4 py-2 bg-black text-white rounded dark:bg-[#1E2939]"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserInfo;
