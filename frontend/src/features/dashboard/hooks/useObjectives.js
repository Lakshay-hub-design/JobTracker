import toast from "react-hot-toast";
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
        const toastId = toast.loading("Adding new objective...")
        try {
            await createObjective(axiosPrivate, data)
            refetchDAshboard()

            toast.success("Objective successfully added", {
                id: toastId,
            });
        } catch (err) {
            console.log(err)
            toast.error("Failed to add objective", {
                id: toastId,
            });
        }
    }

    return {
        handleIncrement,
        handleCreate
    }
}