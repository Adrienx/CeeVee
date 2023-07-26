const User = require("../models/User")

const UserController = {
  index: async (req, res) => {
    try {
      const users = await User.find()
      res.json(users)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  create: async (req, res) => {
    const { firstName, lastName, email, password } = req.body

    try {
      const newUser = new User({
        firstName,
        lastName,
        email,
        password,
      })

      await newUser.save()
      res.status(201).json(newUser)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  show: async (req, res) => {
    try {
      const user = await User.findById(req.params.id)
      res.json(user)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  update: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      })
      res.json(user)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  delete: async (req, res) => {
    try {
      await User.findByIdAndRemove(req.params.id)
      res.json({ message: "User successfully deleted." })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
}

module.exports = UserController
