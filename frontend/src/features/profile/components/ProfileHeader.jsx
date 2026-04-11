import { useRef, useState } from "react";
import { RiPencilFill } from "react-icons/ri";
import { BsCameraFill } from "react-icons/bs";

const ProfileHeader = ({ profile, handleUpdateProfile }) => {

  const { username, email, createdAt, personalInfo } = profile

  const joinedDate = new Date(createdAt).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric"
  })

  const fileRef = useRef(null)
  const [preview, setPreview] = useState(personalInfo?.profileImage?.url || null)

  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setPreview(URL.createObjectURL(file))

    const data = {
      personalInfo: {}
    }

    await handleUpdateProfile(data, file)
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm flex items-center justify-between">

      <div className="flex items-center gap-5">

        <div className="relative h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center">
          <div onClick={() => fileRef.current.click() } className="absolute bottom-0 right-0 flex items-center justify-center bg-[#A83200] h-7 w-7 rounded-full cursor-pointer">
            <BsCameraFill size={13} className="text-white" />
          </div>
          <input 
            ref={fileRef}  
            onChange={handleFileChange}
            type="file" className="hidden" 
           />
          {preview ? (
            <img
              src={preview}
              alt="profile"
              className="h-full w-full object-cover rounded-full"
            />
          ) : (
            <span className="text-2xl font-bold text-gray-600">
              {username?.charAt(0)}
            </span>
          )}
        </div>

        <div>
          <h2 className="text-2xl font-bold">{username}</h2>
          <div className="flex items-center gap-2">
            <p className="text-[#6D5750] font-medium">{email}</p>
            <div className="bg-[#222222] w-1 h-1 rounded-full mt-1"></div>
            <p className=" text-[#A46650] font-medium text-lg mt-1">
                Joined {joinedDate}
            </p>
          </div>

          {personalInfo?.bio && (
            <p className="text-sm text-gray-600 mt-2 max-w-md">
              {personalInfo.bio}
            </p>
          )}
        </div>
      </div>

      {/* RIGHT */}
      <button className="px-5 py-3 flex items-center gap-2 bg-[#E4E2E1] text-gray-700 font-bold rounded-full hover:bg-gray-200 transition">
        <RiPencilFill />
        Edit Profile
      </button>

    </div>
  )
}

export default ProfileHeader