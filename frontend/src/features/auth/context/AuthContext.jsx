import { createContext, useEffect, useState, useRef } from "react";
import api from "../../../shared/api/axios";

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [accessToken, setAccessToken] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const hasRefreshed = useRef(false)

    useEffect(() => {
        if (hasRefreshed.current) return
        hasRefreshed.current = true
      const refresh = async () => {
        try {
            setLoading(true)
            const res = await api.get('/api/auth/refresh-token')

            setAccessToken(res.data.accessToken)
        } catch (err) {
            console.log("Error refreshing token:", err.response?.data || err.message)
        } finally {
            setLoading(false)
        }
      }
      refresh()
    }, [])
    

    return (
        <AuthContext.Provider value={{ user, setUser, accessToken, setAccessToken, error, setError, loading, setLoading }} >
            {children}
        </AuthContext.Provider>
    )
}