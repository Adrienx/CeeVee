const express = require("express")
const router = express.Router()

const UserRoute = require("./UserRoute")
const ResumeRoute = require("./ResumeRoute")
const CoverLetterRoute = require("./CoverLetterRoute")
const JobDescriptionRoute = require("./JobDescriptionRoute")
const NewResumeRoute = require("./NewResumeRoute")
const NewCoverLetterRoute = require("./NewCoverLetterRoute")
const CreateChatRoute = require("./CreateChatRoute")

router.use("/users", UserRoute)
router.use("/resumes", ResumeRoute)
router.use("/coverletters", CoverLetterRoute)
router.use("/jobdescriptions", JobDescriptionRoute)
router.use("/newresumes", NewResumeRoute)
router.use("/newcoverletters", NewCoverLetterRoute)
router.use("/createChat", CreateChatRoute)

module.exports = router
