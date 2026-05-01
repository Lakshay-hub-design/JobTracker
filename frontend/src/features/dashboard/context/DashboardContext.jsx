import { useState } from 'react'
import { createContext } from 'react'

export const DashboardContext = createContext()

export const DashboardProvider = ({children}) => {
    const [dashboardData, setDashboardData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const incrementObjectiveLocal = ({ id, type }) => {
        setDashboardData(prev => {
            if (!prev) return prev
            return {
            ...prev,
            objectives: prev.objectives.map(obj => {
                const match =
                (id && obj._id === id) ||
                (type && obj.type === type)

                if (match) {
                const newProgress = obj.progress + 1

                return {
                    ...obj,
                    progress: newProgress,
                    status: newProgress >= obj.target ? "completed" : obj.status
                }
                }

                return obj
            })
            }
        })
    }

    const addObjectiveLocal = (newObj) => {
        setDashboardData(prev => ({
        ...prev,
        objectives: [...(prev?.objectives || []), newObj]
        }))
    }

    const deleteObjectiveLocal = (id) => {
        setDashboardData(prev => ({
        ...prev,
        objectives: prev.objectives.filter(obj => obj._id !== id)
        }))
    }

    return (
        <DashboardContext.Provider value={{ dashboardData, setDashboardData, loading, setLoading, error, setError, incrementObjectiveLocal, addObjectiveLocal, deleteObjectiveLocal}}>
            {children}
        </DashboardContext.Provider>
    )
}