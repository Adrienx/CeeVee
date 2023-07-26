const express = require("express")
const router = express.Router()

const CoverLetterController = require("../controllers/CoverLetterController")

router.get("/", CoverLetterController.index)
router.post("/", CoverLetterController.create)
router.get("/:id", CoverLetterController.show)
router.put("/:id", CoverLetterController.update)
router.delete("/:id", CoverLetterController.delete)

module.exports = router
