import React, { useState, useEffect } from "react"
import { useTheme } from "../../app/context/ThemeContext"

const techOptions = ["React", "Node.js", "MongoDB", "JavaScript", "Python"]

const PreferencesTab = ({ profile, handleUpdateProfile }) => {
  const [formData, setFormData] = useState({
    preferredRole: "",
    preferredLocation: "",
    techStack: [],
    experienceLevel: "junior",
  })

  const { theme, toggleTheme } = useTheme()

    useEffect(() => {
    setFormData({
      preferredRole: profile.personalInfo?.preferredRole || "",
      preferredLocation: profile.personalInfo?.preferredLocation || "",
      techStack: profile.personalInfo?.techStack || [],
      experienceLevel: profile.personalInfo?.experienceLevel || "junior",
    })
  }, [profile])

    const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

    const handleTechToggle = (tech) => {
    setFormData((prev) => {
      const exists = prev.techStack.includes(tech)

      return {
        ...prev,
        techStack: exists
          ? prev.techStack.filter((t) => t !== tech)
          : [...prev.techStack, tech],
      }
    })
  }

    const handleSubmit = async () => {
    const data = {
      personalInfo: {
        preferredRole: formData.preferredRole,
        preferredLocation: formData.preferredLocation,
        techStack: formData.techStack,
        experienceLevel: formData.experienceLevel,
      },
    }

    await handleUpdateProfile(data)
  }
  
  return (
    <div className="space-y-5 md:space-y-6">
      <div className="mb-5">
        <h3 className="text-lg md:text-xl font-semibold dark:text-gray-400 mb-3">
          App Preferences
        </h3>

        <div className="flex items-center justify-between p-3 rounded-xl bg-white/40 dark:bg-white/5 border border-white/10">
          <div>
            <p className="text-sm font-medium">Dark Mode</p>
            <p className="text-xs text-gray-500">Switch app appearance</p>
          </div>

          <button
            onClick={toggleTheme}
            className={`w-12 h-6 flex items-center rounded-full p-1 transition
        ${theme === "dark" ? "bg-orange-500" : "bg-gray-300"}`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full shadow-md transform transition
          ${theme === "dark" ? "translate-x-6" : "translate-x-0"}`}
            />
          </button>
        </div>
      </div>
      <h3 className="text-lg md:text-xl dark:text-gray-400 *:font-medium">
        Career Preferences
      </h3>
      <div className="flex flex-col md:flex-row gap-6 justify-between">
        <div className="md:w-1/2">
          <label className="text-[#614942] dark:text-[#be856f] font-medium">
            Preferred Role
          </label>
          <input
            name="preferredRole"
            value={formData.preferredRole}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-2 bg-white dark:bg-[#3b3634] text-gray-600 dark:text-[#ada5a5] rounded-md"
          />
        </div>

        <div className="md:w-1/2">
          <label className="text-[#614942] dark:text-[#be856f] font-medium">
            Preferred Location
          </label>
          <input
            name="preferredLocation"
            value={formData.preferredLocation}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-2 bg-white dark:bg-[#3b3634] text-gray-600 dark:text-[#ada5a5] rounded-md"
          />
        </div>
      </div>

      <div>
        <label className="text-[#614942] dark:text-[#be856f] font-medium">
          Tech Stack
        </label>

        <div className="flex flex-wrap gap-2 mt-2">
          {techOptions.map((tech) => (
            <button
              key={tech}
              onClick={() => handleTechToggle(tech)}
              type="button"
              className={`px-4 py-2 rounded-full text-sm border dark:border-none transition ${
                formData.techStack.includes(tech)
                  ? "bg-[#fb8962] text-white"
                  : "bg-gray-100 dark:bg-[#605c5c] text-gray-700 dark:text-[#d4c9c9]"
              }`}
            >
              {tech}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-[#614942] dark:text-[#be856f] font-medium">
          Experience Level
        </label>
        <select
          name="experienceLevel"
          value={formData.experienceLevel}
          onChange={handleChange}
          className="w-full mt-1 px-4 py-2 bg-white dark:bg-[#3b3634] text-gray-600 dark:text-[#ada5a5] rounded-md"
        >
          <option value="junior">Junior</option>
          <option value="mid">Mid</option>
          <option value="senior">Senior</option>
        </select>
      </div>

      <button
        onClick={handleSubmit}
        className="px-6 py-2 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition cursor-pointer"
      >
        Save Preferences
      </button>
    </div>
  );
}

export default PreferencesTab
