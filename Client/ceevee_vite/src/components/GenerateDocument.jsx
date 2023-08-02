import { useContext, useState, useEffect } from "react"
import axios from "axios"
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Spinner,
  Form,
} from "react-bootstrap"
import DataContext from "../data/DataContext"
import { CopyToClipboard } from "react-copy-to-clipboard"

const GenerateDocument = () => {
  const [resume, setResume] = useState("")
  const [jobDescription, setJobDescription] = useState("")
  const [resumeType, setResumeType] = useState("")
  const [jobDescriptionType, setJobDescriptionType] = useState("")
  const [resumes, setResumes] = useState([])
  const [jobDescriptions, setJobDescriptions] = useState([])
  const [selectedResume, setSelectedResume] = useState(null)
  const [selectedJobDescription, setSelectedJobDescription] = useState(null)
  const { result, setResult } = useContext(DataContext)
  const [loading, setLoading] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const [selectedResumeDescription, setSelectedResumeDescription] = useState("")
  const [selectedResumeBody, setSelectedResumeBody] = useState("")
  const [
    selectedJobDescriptionDescription,
    setSelectedJobDescriptionDescription,
  ] = useState("")
  const [selectedJobDescriptionBody, setSelectedJobDescriptionBody] =
    useState("")

  //////////////////////////////////////////////////////////////////////////////////////////////////////
  // function to handle resume selection change
  const handleResumeSelectionChange = (e) => {
    const selectedResume = resumes[e.target.selectedIndex - 1] //gets the resume object at the selected index from the resumes array. The - 1 is needed because array indices start at 0, but selectedIndex starts at 1.
    setSelectedResume(selectedResume)
    setSelectedResumeDescription(selectedResume.description)
    setSelectedResumeBody(selectedResume.body)
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////
  // function to handle job description selection change
  const handleJobDescriptionSelectionChange = (e) => {
    const selectedJobDescription = jobDescriptions[e.target.selectedIndex - 1]
    setSelectedJobDescription(selectedJobDescription)
    setSelectedJobDescriptionDescription(selectedJobDescription.description)
    setSelectedJobDescriptionBody(selectedJobDescription.body)
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////
  // Handle copy to clipboard action

  const handleCopy = () => {
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 3000) // Reset after 3s
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////
  // Fetch resumes and job descriptions upon component's mount

  useEffect(() => {
    fetchResumes()
    fetchJobDescriptions()
  }, [])

  //////////////////////////////////////////////////////////////////////////////////////////////////////
  // Fetch resumes from server

  const fetchResumes = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/resumes")
      setResumes(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////
  // Fetch job descriptions from server

  const fetchJobDescriptions = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/jobdescriptions")
      setJobDescriptions(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////
  // Generate a new tailored resume by making a POST request to the server

  const generateNewResume = async () => {
    let resumeText = ""
    let jobDescriptionText = ""

    if (resumeType === "existing") {
      resumeText = selectedResume.body
    } else {
      resumeText = resume
    }

    if (jobDescriptionType === "existing") {
      jobDescriptionText = selectedJobDescription.body
    } else {
      jobDescriptionText = jobDescription
    }

    const message = `As an AI, your task is to help optimize a resume for a specific job application. 
    You have two key inputs: the existing resume and a job description.

    Job description:
    ${jobDescriptionText}

    Original resume:
    ${resumeText}`

    //////////////////////////////////////////////////////////////////////////////////////////////////////
    // Loading screen when fetching data

    try {
      setLoading(true)
      const res = await axios.post("http://localhost:3001/api/createChat", {
        messages: [{ role: "system", content: message }],
      })
      setResult(res.data.choices[0].message.content)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    )
  }

  return (
    <Container
      className="mt-5"
      style={{
        minHeight: "100vh", // Ensuring the container takes the full viewport height
        minWidth: "33%",
        padding: "1em",
        border: "1px solid #CCC",
        backgroundImage: `url("https://i.imgur.com/2m3qGcg.png")`,
        backgroundSize: "cover", // To cover the entire container
        backgroundRepeat: "no-repeat", // To prevent the image from repeating
      }}
    >
      <Row>
        <Col>
          <Card
            className="mb-4"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.7)", // Adding some transparency to the cards
            }}
          >
            <Card.Body>
              <Card.Title>Resume</Card.Title>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Check
                    type="radio"
                    label="Use a new document"
                    name="resumeOptions"
                    id="resumeNew"
                    onChange={() => setResumeType("new")}
                    checked={resumeType === "new"}
                  />
                  <Form.Check
                    type="radio"
                    label="Select an existing document"
                    name="resumeOptions"
                    id="resumeExisting"
                    onChange={() => setResumeType("existing")}
                    checked={resumeType === "existing"}
                  />
                  <Form.Select
                    aria-label="Select Existing Resume"
                    onChange={(e) => {
                      const selected = resumes[e.target.selectedIndex - 1]
                      setSelectedResume(selected)
                      setResume(selected?.body || "")
                    }}
                    disabled={resumeType !== "existing"}
                  >
                    <option>Select existing resume...</option>
                    {resumes.map((res, index) => (
                      <option key={index}>{res.title}</option>
                    ))}
                  </Form.Select>
                  {resumeType === "existing" && selectedResume && (
                    <>
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        type="text"
                        readOnly
                        value={selectedResume.description}
                      />
                      <Form.Label>Body</Form.Label>
                      <Form.Control
                        as="textarea"
                        readOnly
                        rows={10}
                        value={selectedResume.body}
                      />
                    </>
                  )}
                </Form.Group>
                {resumeType === "new" && (
                  <Form.Group className="mb-3">
                    <Form.Label>Resume Text</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={10}
                      value={resume}
                      onChange={(e) => setResume(e.target.value)}
                      placeholder="Paste your current resume here"
                    />
                  </Form.Group>
                )}
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card
            className="mb-4"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.7)", // Adding some transparency to the cards
            }}
          >
            <Card.Body>
              <Card.Title>Job Description</Card.Title>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Check
                    type="radio"
                    label="Use a new document"
                    name="jobDescriptionOptions"
                    id="jobDescriptionNew"
                    onChange={() => setJobDescriptionType("new")}
                    checked={jobDescriptionType === "new"}
                  />
                  <Form.Check
                    type="radio"
                    label="Select an existing document"
                    name="jobDescriptionOptions"
                    id="jobDescriptionExisting"
                    onChange={() => setJobDescriptionType("existing")}
                    checked={jobDescriptionType === "existing"}
                  />
                  <Form.Select
                    aria-label="Select Existing Job Description"
                    onChange={(e) => {
                      const selected =
                        jobDescriptions[e.target.selectedIndex - 1]
                      setSelectedJobDescription(selected)
                      setJobDescription(selected?.body || "")
                    }}
                    disabled={jobDescriptionType !== "existing"}
                  >
                    <option>Select existing job description...</option>
                    {jobDescriptions.map((jd, index) => (
                      <option key={index}>{jd.title}</option>
                    ))}
                  </Form.Select>
                  {jobDescriptionType === "existing" &&
                    selectedJobDescription && (
                      <>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                          type="text"
                          readOnly
                          value={selectedJobDescription.description}
                        />
                        <Form.Label>Body</Form.Label>
                        <Form.Control
                          as="textarea"
                          readOnly
                          rows={10}
                          value={selectedJobDescription.body}
                        />
                      </>
                    )}
                </Form.Group>
                {jobDescriptionType === "new" && (
                  <Form.Group className="mb-3">
                    <Form.Label>Job Description Text</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={10}
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                      placeholder="Paste the job description for which you are applying here"
                    />
                  </Form.Group>
                )}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <div className="text-center">
        <Button onClick={generateNewResume} className="mb-4">
          Generate Tailored Resume
        </Button>
      </div>
      {result && (
        <Card className="mb-4">
          <Card.Body>
            <Card.Title>Generated Resume</Card.Title>
            <Form.Control as="textarea" readOnly rows={30} value={result} />
            <CopyToClipboard text={result} onCopy={handleCopy}>
              <Button className="mt-4">
                {isCopied ? "Copied!" : "Copy to clipboard"}
              </Button>
            </CopyToClipboard>
          </Card.Body>
        </Card>
      )}
    </Container>
  )
}

export default GenerateDocument
