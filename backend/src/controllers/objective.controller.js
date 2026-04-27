const asyncHandler = require("../middlewares/asyncHandler")
const {
  getWeeklyObjectivesService,
  incrementObjectiveService,
  createObjectiveService
} = require("../services/objective.service")

const getWeeklyObjectives = asyncHandler(async (req, res) => {
    const objectives = await getWeeklyObjectivesService(req.user.id)
})

const incrementObjective = async (req, res) => {
  const objective = await incrementObjectiveService(req.params.id, req.user.id)

  res.json({ success: true, objective })
}

const createObjective = async (req, res) => {
  const objective = await createObjectiveService(req.user.id, req.body)

  res.json({ success: true, objective })
}

module.exports = {
    getWeeklyObjectives,
    incrementObjective,
    createObjective
}