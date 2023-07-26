const NewCoverLetter = require("../models/NewCoverLetter")

const NewCoverLetterController = {
  index: async (req, res) => {
    try {
      const newCoverLetters = await NewCoverLetter.find()
      res.json(newCoverLetters)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  create: async (req, res) => {
    const { title, description, body, jobDescription, user } = req.body

    try {
      const newCoverLetter = new NewCoverLetter({
        title,
        description,
        body,
        jobDescriptionID: jobDescription,
        userID: user,
      })

      await newCoverLetter.save()
      res.status(201).json(newCoverLetter)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  show: async (req, res) => {
    try {
      const newCoverLetter = await NewCoverLetter.findById(req.params.id)
      res.json(newCoverLetter)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  update: async (req, res) => {
    try {
      const newCoverLetter = await NewCoverLetter.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      )
      res.json(newCoverLetter)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  delete: async (req, res) => {
    try {
      await NewCoverLetter.findByIdAndRemove(req.params.id)
      res.json({ message: "New cover letter successfully deleted." })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
}

module.exports = NewCoverLetterController
