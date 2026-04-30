const Objective = require('../models/objective.model')
const getWeekId = require('../utils/getWeekId')
const { ApiError } = require('../utils/apiError')
const mongoose = require('mongoose')

const getWeeklyObjectivesService = async (userId) => {
  const weekId = getWeekId()

  let objectives = await Objective.find({ userId, weekId })

  if (objectives.length === 0) {
    objectives = await Objective.insertMany([
      {
        userId,
        title: "Apply to 5 jobs",
        target: 5,
        type: "applications",
        isManual: false,
        weekId
      },
      {
        userId,
        title: "Complete 2 mock interviews",
        target: 2,
        type: "mock_interview",
        isManual: true,
        weekId
      }
    ])
  }

  return objectives
}

const incrementObjectiveService = async (objectiveId, userId) => {
  const objective = await Objective.findOne({ _id: objectiveId, userId })

  if (!objective) throw new ApiError(404, "Objective not found")

  if (objective.status === "completed") return objective

  objective.progress += 1

  if (objective.progress >= objective.target) {
    objective.status = "completed"
  }

  await objective.save()

  return objective
}

const createObjectiveService = async (userId, data) => {
  const weekId = getWeekId()

  const objective = await Objective.create({
    userId,
    title: data.title,
    target: data.target,
    type: "custom",
    isManual: true,
    weekId
  })

  return objective
}

const deleteObjectiveService = async (objectiveId, userId) => {

  if (!mongoose.Types.ObjectId.isValid(objectiveId)) {
    throw new ApiError(400, "Invalid objective ID");
  }

  const deleteObjective = await Objective.findOneAndDelete({ _id: objectiveId, userId})

  if (!deleteObjective) throw new ApiError(404, "Objective not found")

  return deleteObjective
}

const updateApplicationObjective = async (userId) => {
  const weekId = getWeekId()

  const objective = await Objective.findOne({
    userId,
    type: "applications",
    weekId
  })

  if (!objective || objective.status === "completed") return

  objective.progress += 1

  if (objective.progress >= objective.target) {
    objective.status = "completed"
  }

  await objective.save()
}

module.exports = {
    getWeeklyObjectivesService,
    incrementObjectiveService,
    createObjectiveService,
    deleteObjectiveService,
    updateApplicationObjective
}