import React, { useState, useEffect } from "react"
import {
  Card,
  Button,
  Form,
  Spinner,
  Container,
  Row,
  Col,
} from "react-bootstrap"
import axios from "axios"

const Documents = () => {
  const [docType, setDocType] = useState("resume") // Default docType set to "resume"
  const [operation, setOperation] = useState(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [body, setBody] = useState("")
  const [loading, setLoading] = useState(false)

  const handleDocTypeChange = (event) => {
    setDocType(event.target.value)
  }

  const handleOperationChange = (event) => {
    setOperation(event.target.value)
  }

  const handleCreate = async () => {
    setLoading(true)

    const endpoint = `http://localhost:3001/api/${docType}s`
    try {
      const response = await axios.post(endpoint, {
        title,
        description,
        body,
        // User ID hardcode for now
        userID: "64c08b91e8bfd4c5a00ea0b0",
      })
      if (response.status === 201) {
        alert("Document created successfully!")
        setTitle("")
        setDescription("")
        setBody("")
      } else {
        alert("Failed to create document")
      }
    } catch (error) {
      console.error(error)
      alert("Failed to create document")
    }
    setLoading(false)
  }

  return (
    <Container>
      <Row>
        <Col>
          <Form.Check
            type="radio"
            label="Resume"
            name="docType"
            value="resume"
            checked={docType === "resume"}
            onChange={handleDocTypeChange}
          />
          <Form.Check
            type="radio"
            label="Job Description"
            name="docType"
            value="jobDescription"
            checked={docType === "jobDescription"}
            onChange={handleDocTypeChange}
          />
        </Col>
        <Col>
          <Form.Select onChange={handleOperationChange}>
            <option value="">Select an operation</option>
            <option value="create">Create New</option>
            <option value="update">Update Existing</option>
            <option value="delete">Delete Existing Document</option>
          </Form.Select>
        </Col>
      </Row>
      {operation === "create" && (
        <Row className="mt-4">
          <Col>
            <Card>
              <Card.Body>
                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter a title"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter a description"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Body</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={10}
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder="Enter the body"
                  />
                </Form.Group>
                <Button onClick={handleCreate} disabled={loading}>
                  {loading ? <Spinner animation="border" size="sm" /> : "Save"}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
      {operation === "update" && (
        <Row className="mt-4">
          <Col>
            <Card>
              <Card.Body>Update functionality goes here...</Card.Body>
            </Card>
          </Col>
        </Row>
      )}
      {operation === "delete" && (
        <Row className="mt-4">
          <Col>
            <Card>
              <Card.Body>Delete functionality goes here...</Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  )
}

export default Documents
