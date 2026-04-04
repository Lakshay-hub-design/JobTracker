export async function getDashboardStats(axiosPrivate) {
    try {
        const res = await axiosPrivate.get('/api/job/dashboard/full')
        return res.data
    } catch (error) {
        throw error.response?.data || error
    }
}