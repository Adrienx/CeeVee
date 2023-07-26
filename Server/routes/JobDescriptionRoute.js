const express = require("express")
const router = express.Router()

const JobDescriptionController = require("../controllers/JobDescriptionController")

router.get("/", JobDescriptionController.index)
router.post("/", JobDescriptionController.create)
router.get("/:id", JobDescriptionController.show)
router.put("/:id", JobDescriptionController.update)
router.delete("/:id", JobDescriptionController.delete)

module.exports = router
