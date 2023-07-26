const express = require("express")
const router = express.Router()

const ResumeController = require("../controllers/ResumeController")

router.get("/", ResumeController.index)
router.post("/", ResumeController.create)
router.get("/:id", ResumeController.show)
router.put("/:id", ResumeController.update)
router.delete("/:id", ResumeController.delete)

module.exports = router
