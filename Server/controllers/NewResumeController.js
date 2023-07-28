const NewResume = require("../models/NewResume")

const NewResumeController = {
  index: async (req, res) => {
    try {
      const newResumes = await NewResume.find()
      res.json(newResumes)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  create: async (req, res) => {
    const { title, description, body, jobDescription, user } = req.body

    try {
      const newResume = new NewResume({
        title,
        description,
        body,
        jobDescriptionID: jobDescription,
        userID: user,
      })

      await newResume.save()
      res.status(201).json(newResume)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  show: async (req, res) => {
    try {
      const newResume = await NewResume.findById(req.params.id)
      res.json(newResume)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  update: async (req, res) => {
    try {
      const newResume = await NewResume.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      )
      res.json(newResume)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  delete: async (req, res) => {
    try {
      await NewResume.findByIdAndRemove(req.params.id)
      res.json({ message: "New resume successfully deleted." })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
}

module.exports = NewResumeController
