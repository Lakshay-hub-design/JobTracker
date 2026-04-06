export async function getJobs(axiosPrivate, queryParams){
    try {
        const res = await axiosPrivate.get('/api/job', {
            params: queryParams
        })
        return res.data
    } catch (error) {
        throw error.response?.data || error
    }
}

export async function getJobDetails(axiosPrivate, jobId){
    try {
        const res = await axiosPrivate.get(`/api/job/${jobId}`)
        return res.data
    } catch (error) {
        throw error.response?.data || error
    }
}

export async function deleteJob(axiosPrivate, jobId){
    try {
        const res = await axiosPrivate.delete(`/api/job/${jobId}`)
        return res.data
    } catch (error) {
        throw error.response?.data || error
    }
}

export async function updateJob(axiosPrivate, jobId, data){
    try {
        const res = await axiosPrivate.patch(`/api/job/${jobId}`, data)
        return res.data
    } catch (error) {
        throw error.response?.data || error
    }
}