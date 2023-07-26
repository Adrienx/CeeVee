const mongoose = require("mongoose")

const CoverLetterSchema = new mongoose.Schema(
  {
    userID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true },
    description: { type: String, required: true },
    body: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

const CoverLetter = mongoose.model("CoverLetter", CoverLetterSchema)

module.exports = CoverLetter
