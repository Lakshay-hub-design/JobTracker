import React, { useEffect, useState } from "react"
import { X } from "lucide-react"

const EditJobDrawer = ({ job, onClose, onSave }) => {
  const [formData, setFormData] = useState(job)
  const [open, setOpen] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    setOpen(true)
  }, [])

  if (!job) return null

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async () => {
    setSaving(true)
    await onSave(formData)
    setSaving(false)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex">

      {/* BACKDROP */}
      <div
        className="flex-1 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* DRAWER */}
      <div
        className={`w-[520px] bg-[#F5F3F2] h-full shadow-2xl flex flex-col transform transition-transform duration-300
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >

        {/* HEADER (STICKY) */}
        <div className="sticky top-0 bg-white dark:bg-[#1c1a1a] z-10 border-b dark:border-[#363535] p-5 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Edit Job</h2>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#4d4a4a]"
          >
            <X size={18} />
          </button>
        </div>

        {/* CONTENT */}
        <div className="flex-1 dark:bg-[#221F1E] overflow-y-auto p-5 space-y-8">

          {/* SECTION 1 */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 dark:text-[#d8a6a6] mb-4 uppercase tracking-wide">
              Basic Info
            </h3>

            <div className="space-y-4">

              <input
                name="position"
                value={formData.position}
                onChange={handleChange}
                placeholder="Position"
                className="w-full p-3 dark:text-[#cdc4c4] bg-white dark:bg-[#33302f] rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />

              <input
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Company"
                className="w-full p-3 dark:text-[#cdc4c4] bg-white dark:bg-[#33302f] rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />

              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Location"
                className="w-full p-3 dark:text-[#cdc4c4] bg-white dark:bg-[#33302f] rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />

              <select
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
                className="w-full p-3 dark:text-[#cdc4c4] bg-white dark:bg-[#33302f] rounded-lg focus:outline-none"
              >
                <option value="full-time">Full-time</option>
                <option value="internship">Internship</option>
                <option value="part-time">Part-time</option>
              </select>

            </div>
          </div>

          {/* SECTION 2 */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 dark:text-[#d8a6a6] mb-4 uppercase tracking-wide">
              Description
            </h3>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={6}
              className="w-full p-3 dark:text-[#cdc4c4] bg-white dark:bg-[#33302f] rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Job description..."
            />
          </div>

          {/* SECTION 3 */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 dark:text-[#d8a6a6] mb-4 uppercase tracking-wide">
              Notes
            </h3>

            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={4}
              className="w-full p-3 dark:text-[#cdc4c4] bg-white dark:bg-[#33302f] rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Your notes..."
            />
          </div>

        </div>

        {/* FOOTER (STICKY SAVE BAR) */}
        <div className="border-t dark:border-[#3d3939] p-4 flex justify-end gap-3 bg-white dark:bg-[#191716]">

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border dark:border-[#3c3939]"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={saving}
            className="px-5 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>

        </div>

      </div>
    </div>
  )
}

export default EditJobDrawer