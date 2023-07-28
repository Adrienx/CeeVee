import DataContext from "../data/DataContext"
import { useContext, useState } from "react"
import axios from "axios"

const GenerateDocument = () => {
  const [resume, setResume] = useState("")
  const [jobDescription, setJobDescription] = useState("")
  const { result, setResult } = useContext(DataContext)
  const [loading, setLoading] = useState(false)

  const generateNewResume = async () => {
    const messages = [
      { role: "system", content: "You are a helpful assistant." },
      {
        role: "user",
        content: `Here is my resume:\n\n${resume}\n\nAnd here is the job description I'm interested in:\n\n${jobDescription}`,
      },
      {
        role: "assistant",
        content:
          "Please generate a new resume tailored to the job description.",
      },
    ]

    try {
      setLoading(true)
      const res = await axios.post(`http://localhost:3001/api/createChat`, {
        messages,
      })
      setResult(res.data.choices[0].message.content)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2>gen docs</h2>
      <textarea
        value={resume}
        onChange={(e) => setResume(e.target.value)}
        placeholder="Paste your resume here"
      ></textarea>
      <textarea
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        placeholder="Paste the job description here"
      ></textarea>
      <button onClick={generateNewResume}>Generate New Resume</button>
      {loading && <p>Loading...</p>}
      {result && <p>{result}</p>}
    </div>
  )
}

export default GenerateDocument
