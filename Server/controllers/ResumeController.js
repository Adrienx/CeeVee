const Resume = require("../models/Resume")

const ResumeController = {
  index: async (req, res) => {
    try {
      const resumes = await Resume.find()
      res.json(resumes)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  create: async (req, res) => {
    const { title, description, body, userID } = req.body

    try {
      const newResume = new Resume({
        title,
        description,
        body,
        userID,
      })

      await newResume.save()
      res.status(201).json(newResume)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  show: async (req, res) => {
    try {
      const resume = await Resume.findById(req.params.id)
      res.json(resume)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  update: async (req, res) => {
    try {
      const resume = await Resume.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      })
      res.json(resume)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  delete: async (req, res) => {
    try {
      await Resume.findByIdAndRemove(req.params.id)
      res.json({ message: "Resume successfully deleted." })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
}

module.exports = ResumeController
