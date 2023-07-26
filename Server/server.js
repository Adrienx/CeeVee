const express = require("express")
const app = express()
const cors = require("cors")
const db = require("./db")
const PORT = process.env.PORT || 3001
const AppRouter = require("./routes/AppRouter.js")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
  res.send("ceevee landing page")
})

app.use("/api", AppRouter)

app.listen(PORT, () => console.log(`Server Started On Port: ${PORT}`))
