export async function incrementObjective (axiosPrivate, objectiveId) {
  try{
    await axiosPrivate.patch(`/api/objectives/${objectiveId}/increment`)
  }catch(error){
    throw error.response?.data || error
  }
}

export async function createObjective (axiosPrivate, data) {
  try {
    const res = await axiosPrivate.post("/api/objectives", data)
    return res.data
  } catch (error) {
    throw error.response?.data || error
  }
}

export async function deleteObjective(axiosPrivate, objectiveId){
  try {
    await axiosPrivate.delete(`/api/objectives/${objectiveId}/delete`)
  } catch (error) {
    throw error.response?.data || error
  }
}