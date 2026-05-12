import { createContext, useEffect, useState, useRef, useMemo } from "react";
import api from "../../../shared/api/axios";

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [accessToken, setAccessToken] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [authLoading, setAuthLoading] = useState(true)

    const hasRefreshed = useRef(false)

    useEffect(() => {
        if (hasRefreshed.current) return
        hasRefreshed.current = true

        const initializeAuth = async () => {
            try {
                const res = await api.get('/api/auth/refresh-token')
                setAccessToken(res.data.accessToken)

                if(res.data.user){
                    setUser(res.data.user)
                }

            } catch (err) {
                if (err.response?.status !== 401) {

                    console.log(
                        "Refresh error:",
                        err.response?.data || err.message
                    )
                }
            } finally {
                setAuthLoading(false)
            }
        }

        initializeAuth()
    }, [])

    const value = useMemo(() => ({
        user,
        setUser,
        accessToken,
        setAccessToken,
        loading,
        setLoading,
        authLoading,
        error,
        setError
    }), [
        user,
        accessToken,
        loading,
        authLoading,
        error
    ])
    

    return (
        <AuthContext.Provider value={value} >
            {children}
        </AuthContext.Provider>
    )
}