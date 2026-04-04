import { useState } from 'react'
import { createContext } from 'react'

export const DashboardContext = createContext()

export const DashboardProvider = ({children}) => {
    const [dashboardData, setDashboardData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    return (
        <DashboardContext.Provider value={{ dashboardData, loading, error, setDashboardData, setLoading, setError }}>
            {children}
        </DashboardContext.Provider>
    )
}