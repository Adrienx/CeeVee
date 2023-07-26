const mongoose = require("mongoose")

const ResumeSchema = new mongoose.Schema(
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

const Resume = mongoose.model("Resume", ResumeSchema)

module.exports = Resume
