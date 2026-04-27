import useAxiosPrivate from "../../../shared/api/axiosPrivate";
import { createObjective, incrementObjective } from "../services/objectiveApi";

export const useObjective = (refetchDAshboard) => {
    const axiosPrivate = useAxiosPrivate()

    const handleIncrement = async (objectiveId) => {
        try{
            await incrementObjective(axiosPrivate, objectiveId)
            refetchDAshboard()
        }catch (err){
            console.log(err)
        }
    }

    const handleCreate = async (data) => {
        try {
            await createObjective(axiosPrivate, data)
            refetchDAshboard()
        } catch (err) {
            console.log(err)
        }
    }

    return {
        handleIncrement,
        handleCreate
    }
}