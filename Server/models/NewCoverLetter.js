const mongoose = require("mongoose")

const NewCoverLetterSchema = new mongoose.Schema(
  {
    userID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    jobDescriptionID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobDescription",
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    body: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

const NewCoverLetter = mongoose.model("NewCoverLetter", NewCoverLetterSchema)

module.exports = NewCoverLetter
