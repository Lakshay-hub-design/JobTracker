export async function getProfile(axiosPrivate) {
    try {
        const res = await axiosPrivate.get('/api/user/profile')
        return res.data.data
    } catch (error) {
        throw error.response?.data || error
    }
}

export async function getStats(axiosPrivate) {
    try {
        const res = await axiosPrivate.get('/api/user/stats')
        return res.data.data
    } catch (error) {
        throw error.response?.data || error
    }
}

export async function updateProfile(axiosPrivate, data, file){
    console.log(data)
    try {
        
        const form = new FormData()

        if(data.username){
            form.append('username', data.username)
        }

        if(data.personalInfo){
            form.append('personalInfo', JSON.stringify(data.personalInfo))
        }

        if(file){
            form.append('profileImage', file)
        }

        console.log([...form.entries()])

        const res = await axiosPrivate.patch('/api/user/profile', form)

        return res.data.data
    } catch (error) {
        throw error.response?.data || error
    }
}

export async function changePassword(axiosPrivate, data) {
  try {
    const res = await axiosPrivate.post("/api/user/change-password", data)
    return res.data
  } catch (error) {
    throw error.response?.data || error
  }
}

export async function logoutAllDevices(axiosPrivate) {
  try {
    const res = await axiosPrivate.get("/api/auth/logout-all")
    return res.data
  } catch (error) {
    throw error.response?.data || error
  }
}