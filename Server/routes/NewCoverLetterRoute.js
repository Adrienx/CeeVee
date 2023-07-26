const express = require("express")
const router = express.Router()

const NewCoverLetterController = require("../controllers/NewCoverLetterController")

router.get("/", NewCoverLetterController.index)
router.post("/", NewCoverLetterController.create)
router.get("/:id", NewCoverLetterController.show)
router.put("/:id", NewCoverLetterController.update)
router.delete("/:id", NewCoverLetterController.delete)

module.exports = router
