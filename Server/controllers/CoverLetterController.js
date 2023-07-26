const CoverLetter = require("../models/CoverLetter")

const CoverLetterController = {
  index: async (req, res) => {
    try {
      const coverLetters = await CoverLetter.find()
      res.json(coverLetters)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  create: async (req, res) => {
    const { title, description, body, user } = req.body

    try {
      const newCoverLetter = new CoverLetter({
        title,
        description,
        body,
        user,
      })

      await newCoverLetter.save()
      res.status(201).json(newCoverLetter)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  show: async (req, res) => {
    try {
      const coverLetter = await CoverLetter.findById(req.params.id)
      res.json(coverLetter)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  update: async (req, res) => {
    try {
      const coverLetter = await CoverLetter.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      )
      res.json(coverLetter)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  delete: async (req, res) => {
    try {
      await CoverLetter.findByIdAndRemove(req.params.id)
      res.json({ message: "Cover letter successfully deleted." })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
}

module.exports = CoverLetterController
