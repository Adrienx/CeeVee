const JobDescription = require("../models/JobDescription")

const JobDescriptionController = {
  index: async (req, res) => {
    try {
      const jobDescriptions = await JobDescription.find()
      res.json(jobDescriptions)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  create: async (req, res) => {
    const { title, description, responsibilities, qualifications, user } =
      req.body

    try {
      const newJobDescription = new JobDescription({
        title,
        description,
        body,
        user,
      })

      await newJobDescription.save()
      res.status(201).json(newJobDescription)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  show: async (req, res) => {
    try {
      const jobDescription = await JobDescription.findById(req.params.id)
      res.json(jobDescription)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  update: async (req, res) => {
    try {
      const jobDescription = await JobDescription.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      )
      res.json(jobDescription)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  delete: async (req, res) => {
    try {
      await JobDescription.findByIdAndRemove(req.params.id)
      res.json({ message: "Job description successfully deleted." })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
}

module.exports = JobDescriptionController
