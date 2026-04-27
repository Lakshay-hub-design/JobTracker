import { useState } from "react"

const AddObjectiveModal = ({ onClose, onSubmit }) => {
  const [title, setTitle] = useState("")
  const [target, setTarget] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!title || !target) return

    onSubmit({
      title,
      target: Number(target)
    })

    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* modal */}
      <div className="relative bg-[#1A1A1B] w-[350px] rounded-2xl p-6 shadow-xl border border-white/10">

        <h2 className="text-lg font-semibold mb-4">Add Custom Goal</h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            placeholder="Goal title (e.g. Practice DSA)"
            className="w-full p-2 rounded bg-[#2a2a2b] text-sm outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="number"
            placeholder="Target (e.g. 3)"
            className="w-full p-2 rounded bg-[#2a2a2b] text-sm outline-none"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition"
          >
            Add Goal
          </button>

        </form>

      </div>
    </div>
  )
}

export default AddObjectiveModal