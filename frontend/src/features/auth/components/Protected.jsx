import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Protected = () => {
    const { loading, user } = useAuth()

    if (loading) {
        return null
    }
    
    if (!user) {
        return <Navigate to={'/user/login'} replace />
    }
    return <Outlet />
}

export default Protected