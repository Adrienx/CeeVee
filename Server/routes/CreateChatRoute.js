const express = require("express")
const router = express.Router()
const { Configuration, OpenAIApi } = require("openai")
require("dotenv").config()

router.post("/", async (req, res) => {
  const messages = req.body.messages

  const configuration = new Configuration({
    apiKey: process.env.VITE_Open_AI_Key,
  })

  console.log(process.env.VITE_Open_AI_Key)

  const openai = new OpenAIApi(configuration)

  try {
    const result = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: messages,
    })

    res.json(result.data)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: "Failed to generate chat response",
      details: error.message,
    })
  }
})

module.exports = router
