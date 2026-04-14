import axios from "axios";

const api = axios.create({
    baseURL: 'https://jobtracker-1-fiq9.onrender.com',
    withCredentials: true
})

export default api