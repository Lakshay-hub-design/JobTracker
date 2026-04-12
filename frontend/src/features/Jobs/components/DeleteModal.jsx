import { AlertTriangle } from "lucide-react"

const DeleteModal = ({ isOpen, onClose, onConfirm, loading }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />

      {/* Modal */}
      <div className="relative bg-white w-full max-w-md rounded-2xl p-6 shadow-xl animate-scaleIn">

        {/* Icon */}
        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-red-100 mx-auto mb-4">
          <AlertTriangle className="text-red-600" size={28} />
        </div>

        {/* Text */}
        <h2 className="text-xl font-semibold text-center">
          Delete Job?
        </h2>
        <p className="text-gray-500 text-sm text-center mt-2">
          This action cannot be undone. This will permanently delete this job.
        </p>

        {/* Buttons */}
        <div className="flex gap-3 mt-6">
          
          <button
            onClick={onClose}
            className="w-full py-2 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="w-full py-2 rounded-full bg-red-600 text-white font-semibold hover:bg-red-700 active:scale-95 transition"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>

        </div>
      </div>
    </div>
  )
}

export default DeleteModal