import { useParams, useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"

const ResetPasswordPage = () => {
  const { token } = useParams()
  const navigate = useNavigate()

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.")
      return
    }

    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/user/reset-password/${token}`, {
        password,
      })

      setMessage("Password reset successful. Redirecting to login...")
      setTimeout(() => navigate("/user/login"), 3000)
    } catch (err) {
      console.error(err)
      setMessage("Invalid or expired token.")
    }
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-4 shadow border rounded">
      <h2 className="text-xl font-semibold mb-4">Reset Your Password</h2>
      {message && <p className="mb-2 text-red-500">{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="New Password"
          className="block w-full border p-2 mb-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          className="block w-full border p-2 mb-2"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Reset Password
        </button>
      </form>
    </div>
  )
}

export default ResetPasswordPage
