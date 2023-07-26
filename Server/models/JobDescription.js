const mongoose = require("mongoose")

const JobDescriptionSchema = new mongoose.Schema(
  {
    userID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true },
    description: { type: String, required: true },
    body: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const JobDescription = mongoose.model("JobDescription", JobDescriptionSchema);

module.exports = JobDescription;
