import { createContext, useState } from "react";

export const JobContext = createContext()

export const JobProvider = ({ children }) => {
    const [jobs, setJobs] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    const [status, setStatus] = useState("")
    const [search, setSearch] = useState("")


    return (
        <JobContext.Provider value={{ jobs, loading, error, page, totalPages, status, search, setJobs, setLoading, setError, setPage, setTotalPages, setStatus, setSearch}}>
            {children}
        </JobContext.Provider>
    )
}