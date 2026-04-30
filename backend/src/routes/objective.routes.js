const express = require("express")
const router = express.Router()

const {
  getWeeklyObjectives,
  incrementObjective,
  createObjective,
  deleteObjective
} = require("../controllers/objective.controller")

const protect = require("../middlewares/auth.middleware")

router.get("/weekly", protect, getWeeklyObjectives)
router.patch("/:id/increment", protect, incrementObjective)
router.post("/", protect, createObjective)
router.delete('/:id/delete', protect, deleteObjective)

module.exports = router