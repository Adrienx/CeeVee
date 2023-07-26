const express = require("express")
const router = express.Router()

const NewResumeController = require("../controllers/NewResumeController")

router.get("/", NewResumeController.index)
router.post("/", NewResumeController.create)
router.get("/:id", NewResumeController.show)
router.put("/:id", NewResumeController.update)
router.delete("/:id", NewResumeController.delete)

module.exports = router
