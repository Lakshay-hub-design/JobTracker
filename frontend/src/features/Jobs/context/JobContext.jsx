import { createContext, useState } from "react";

export const JobContext = createContext()

export const JobProvider = ({ children }) => {
    const [jobs, setJobs] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const [page, setPage] = useState(1)

    const [pagination, setPagination] = useState({})

    const [status, setStatus] = useState("")
    const [search, setSearch] = useState("")


    return (
        <JobContext.Provider value={{ jobs, loading, error, page, status, search, pagination, setPagination, setJobs, setLoading, setError, setPage, setStatus, setSearch}}>
            {children}
        </JobContext.Provider>
    )
}