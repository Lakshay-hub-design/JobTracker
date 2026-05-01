import toast from "react-hot-toast";
import useAxiosPrivate from "../../../shared/api/axiosPrivate";
import { createObjective, deleteObjective, incrementObjective } from "../services/objectiveApi";
import { useContext } from "react";
import { DashboardContext } from "../context/DashboardContext";

export const useObjective = () => {
    const axiosPrivate = useAxiosPrivate()

    const { incrementObjectiveLocal, addObjectiveLocal, deleteObjectiveLocal } = useContext(DashboardContext)


    const handleIncrement = async (objectiveId) => {
        try{
            await incrementObjective(axiosPrivate, objectiveId)
            incrementObjectiveLocal({ id: objectiveId })
        }catch (err){
            console.log(err)
        }
    }

    const handleCreate = async (data) => {
        const toastId = toast.loading("Adding new objective...")
        try {
            const res = await createObjective(axiosPrivate, data)
            addObjectiveLocal(res.objective)

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

    const handleDelete = async (objectiveId) => {
        try {
            await deleteObjective(axiosPrivate, objectiveId)
            deleteObjectiveLocal(objectiveId)
            toast.success('Objective Deleted!')
        } catch (err) {
            console.log(err)
        }
    }

    return {
        handleIncrement,
        handleCreate,
        handleDelete
    }
}