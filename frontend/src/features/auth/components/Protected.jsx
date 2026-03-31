import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Protected = () => {
    const { loading, user } = useAuth()

    if (loading) {
        return (<main><h1>Loading...</h1></main>)
    }
    
    if (!user) {
        return <Navigate to={'/user/login'} replace />
    }
    return <Outlet />
}

export default Protected