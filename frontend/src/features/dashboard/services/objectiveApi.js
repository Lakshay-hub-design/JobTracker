export async function incrementObjective (axiosPrivate, objectiveId) {
  try{
    await axiosPrivate.patch(`/api/objectives/${objectiveId}/increment`)
  }catch(error){
    throw error.response?.data || error
  }
}

export async function createObjective (axiosPrivate, data) {
  try {
    await axiosPrivate.post("/api/objectives", data)
  } catch (error) {
    throw error.response?.data || error
  }
}