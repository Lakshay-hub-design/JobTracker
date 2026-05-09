import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Protected = () => {
    const { authLoading, user } = useAuth()

    if (authLoading) {
        return (
            <div className="h-screen bg-[#121110]" />
        )
    }

    if (!user) {
        return <Navigate to="/user/login" replace />
    }

    return <Outlet />
}

export default Protected