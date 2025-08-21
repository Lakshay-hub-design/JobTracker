import { Pencil } from "lucide-react";
import React, { useEffect } from "react";
import { useState } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { useAuth } from "../../context/AuthContex";
import { toast } from "sonner";

const ProfileRight = () => {
  const { token } = useAuth();

  const [socials, setSocials] = useState([]);
  const [skills, setSkills] = useState([]);
  const [languages, setLanguages] = useState([]);

  // --- New state for socials editing ---
  const [isEditing, setIsEditing] = useState(false);
  const [socialLinks, setSocialLinks] = useState([{ name: "", url: "" }]);
  const [originalProfile, setOriginalProfile] = useState([]);

  const [isEditingSkills, setIsEditingSkills] = useState(false);
  const [skillInputs, setSkillInputs] = useState([{ name: "" }]);
  const [originalSkills, setOriginalSkills] = useState([]);

  const [isEditingLanguages, setIsEditingLanguages] = useState(false);
  const [languageInputs, setLanguageInputs] = useState([{ name: "" }]);
  const [originalLanguages, setOriginalLanguages] = useState([]);

  // --- Handlers ---
  const handleSocialChange = (index, field, value) => {
    const updated = [...socialLinks];
    updated[index][field] = value;
    setSocialLinks(updated);
  };

  const handleAddSocial = () => {
    setSocialLinks([...socialLinks, { name: "", url: "" }]);
  };

  const handleRemoveSocial = (index) => {
    const updated = socialLinks.filter((_, i) => i !== index);
    setSocialLinks(updated);
  };

  const handleSaveSocials = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        "http://localhost:4000/api/user/profile/extras",
        { socials },
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



  const showExtras = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/api/user/profile/extras",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);

      setSocials(res.data.socials || []);
    } catch (error) {
      console.error("Error fetching profile extras:", error);
    }
  };
  useEffect(() => {
    showExtras();
  }, []);

  const handleCancelSocials = () => {
    setSocials(originalProfile.socials || []);
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setOriginalProfile({ socials });
        setIsEditing(true);
  };

  // const handleSkillChange = (index, value) => {
  //   const updated = [...skillInputs];
  //   updated[index].name = value;
  //   setSkillInputs(updated);
  // };
  // const handleAddSkill = () => setSkillInputs([...skillInputs, { name: "" }]);
  // const handleRemoveSkill = (index) => setSkillInputs(skillInputs.filter((_, i) => i !== index));
  // const handleSaveSkills = () => {
  //   setSkills(skillInputs.map((s) => s.name).filter(Boolean));
  //   setIsEditingSkills(false);
  // };
  // const handleCancelSkills = () => {
  //   setSkillInputs(originalSkills.map((s) => ({ name: s })));
  //   setIsEditingSkills(false);
  // };

  //   const handleLanguageChange = (index, value) => {
  //   const updated = [...languageInputs];
  //   updated[index].name = value;
  //   setLanguageInputs(updated);
  // };
  // const handleAddLanguage = () =>
  //   setLanguageInputs([...languageInputs, { name: "" }]);
  // const handleRemoveLanguage = (index) =>
  //   setLanguageInputs(languageInputs.filter((_, i) => i !== index));
  // const handleSaveLanguages = () => {
  //   setLanguages(languageInputs.map((l) => l.name).filter(Boolean));
  //   setIsEditingLanguages(false);
  // };
  // const handleCancelLanguages = () => {
  //   setLanguageInputs(originalLanguages.map((l) => ({ name: l })));
  //   setIsEditingLanguages(false);
  // };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold flex items-center gap-2">
          Socials{" "}
          <Pencil
            size={16}
            className="cursor-pointer text-blue-500"
            onClick={handleEditClick}
          />
        </h2>

        {isEditing ? (
          <div className="mt-4 p-4 border rounded-md bg-gray-50 dark:bg-gray-900">
            <h3 className="font-semibold mb-2">Edit Social Links</h3>

            {socialLinks.map((social, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mb-3"
              >
                <input
                  type="text"
                  placeholder="Platform (e.g., GitHub)"
                  value={social.name}
                  onChange={(e) =>
                    handleSocialChange(index, "name", e.target.value)
                  }
                  className="w-full sm:flex-1 p-2 border rounded-md bg-gray-100 dark:bg-gray-800"
                />
                <input
                  type="url"
                  placeholder="https://example.com"
                  value={social.url}
                  onChange={(e) =>
                    handleSocialChange(index, "url", e.target.value)
                  }
                  className="w-full sm:flex-1 p-2 border rounded-md bg-gray-100 dark:bg-gray-800"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveSocial(index)}
                  className="text-red-500 font-bold sm:self-center"
                >
                  ✕
                </button>
              </div>
            ))}

            <div className="flex flex-col sm:flex-row gap-2 mt-3">
              <Button
                type="button"
                onClick={handleAddSocial}
                className="w-full sm:w-auto"
              >
                + Add Link
              </Button>
              <Button
                type="button"
                onClick={handleSaveSocials}
                className="w-full sm:w-auto"
              >
                Save
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleCancelSocials}
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : socials.length > 0 ? (
          <ul className="list-disc pl-5 mt-2 space-y-1">
            {socials.map((s, i) => (
              <li key={i}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline break-all"
                >
                  {s.name}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No socials set yet</p>
        )}
      </div>

      {/* <div> 
        <h2 className="text-lg font-semibold flex items-center gap-2">
          Skills{" "}
          <Pencil
            size={16}
            className="cursor-pointer text-blue-500"
            onClick={() => {
              setOriginalSkills(skills);
              setSkillInputs(skills.map((s) => ({ name: s })));
              setIsEditingSkills(true);
            }}
          />
        </h2>

        {isEditingSkills ? (
          <div className="mt-4 p-4 border rounded-md bg-gray-50 dark:bg-gray-900">
            <h3 className="font-semibold mb-2">Edit Skills</h3>

            {skillInputs.map((skill, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Enter a skill"
                  value={skill.name}
                  onChange={(e) => handleSkillChange(index, e.target.value)}
                  className="flex-1 p-2 border rounded-md bg-gray-100 dark:bg-gray-800"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(index)}
                  className="text-red-500 font-bold"
                >
                  ✕
                </button>
              </div>
            ))}

            <div className="flex gap-2 mt-2">
              <Button type="button" onClick={handleAddSkill}>
                + Add Skill
              </Button>
              <Button type="button" onClick={handleSaveSkills}>
                Save
              </Button>
              <Button type="button" variant="outline" onClick={handleCancelSkills}>
                Cancel
              </Button>
            </div>
          </div>
        ) : skills.length > 0 ? (
          <ul className="list-disc pl-5 mt-2">
            {skills.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No skills set yet</p>
        )}
      </div>

      <div>
        <h2 className="text-lg font-semibold flex items-center gap-2">
          Languages{" "}
          <Pencil
            size={16}
            className="cursor-pointer text-blue-500"
            onClick={() => {
              setOriginalLanguages(languages);
              setLanguageInputs(languages.map((l) => ({ name: l })));
              setIsEditingLanguages(true);
            }}
          />
        </h2>

        {isEditingLanguages ? (
          <div className="mt-4 p-4 border rounded-md bg-gray-50 dark:bg-gray-900">
            <h3 className="font-semibold mb-2">Edit Languages</h3>

            {languageInputs.map((language, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  placeholder="English"
                  value={language.name}
                  onChange={(e) => handleLanguageChange(index, e.target.value)}
                  className="flex-1 p-2 border rounded-md bg-gray-100 dark:bg-gray-800"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveLanguage(index)}
                  className="text-red-500 font-bold"
                >
                  ✕
                </button>
              </div>
            ))}

            <div className="flex gap-2 mt-2">
              <Button type="button" onClick={handleAddLanguage}>
                + Add Language
              </Button>
              <Button type="button" onClick={handleSaveLanguages}>
                Save
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleCancelLanguages}
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : languages.length > 0 ? (
          <ul className="list-disc pl-5 mt-2">
            {languages.map((l, i) => (
              <li key={i}>{l}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No languages set yet</p>
        )}
      </div>*/}
    </div>
  );
};

export default ProfileRight;
