import { useState, useEffect } from "react"
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
  // States for managing document properties and user interactions
  const [docType, setDocType] = useState("resume") // Default document type
  const [operation, setOperation] = useState(null) // Selected operation (create, update, delete)
  const [title, setTitle] = useState("") // Document title
  const [description, setDescription] = useState("") // Document description
  const [body, setBody] = useState("") // Document body
  const [loading, setLoading] = useState(false) // Loading state
  const [documentList, setDocumentList] = useState([]) // List of documents
  const [selectedDocument, setSelectedDocument] = useState("") // Selected document from the list
  const [actionTrigger, setActionTrigger] = useState(0) // State variable to trigger fetching of new data

  //////////////////////////////////////////////////////////////////////////////////////////////////////
  // Change handlers for form controls
  const handleDocTypeChange = (event) => setDocType(event.target.value)
  const handleOperationChange = (event) => setOperation(event.target.value)

  //////////////////////////////////////////////////////////////////////////////////////////////////////
  // Effect hook to fetch documents based on document type and action trigger
  useEffect(() => {
    const fetchDocuments = async () => {
      const endpoint = `http://localhost:3001/api/${docType}s`
      try {
        const response = await axios.get(endpoint)
        setDocumentList(response.data)
      } catch (error) {
        console.error(error)
        alert("Failed to fetch documents")
      }
    }

    fetchDocuments()
  }, [docType, actionTrigger]) // Depend on docType and actionTrigger

  //////////////////////////////////////////////////////////////////////////////////////////////////////
  // Effect hook to reset fields when the operation is changed (create, update, delete)
  useEffect(() => {
    setSelectedDocument("") // Reset selected document
    setTitle("") // Reset title
    setDescription("") // Reset description
    setBody("") // Reset body
  }, [operation]) // Depend on the 'operation' state

  //////////////////////////////////////////////////////////////////////////////////////////////////////
  // Function to handle creation of a document
  const handleCreate = async () => {
    setLoading(true)
    const endpoint = `http://localhost:3001/api/${docType}s`
    try {
      const response = await axios.post(endpoint, {
        title,
        description,
        body,
        userID: "64c08b91e8bfd4c5a00ea0b0", // User ID hardcoded for now
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
    setActionTrigger(actionTrigger + 1) // Trigger fetching of new data
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////
  // Function to handle updating of a selected document

  const handleUpdate = async () => {
    setLoading(true)
    const endpoint = `http://localhost:3001/api/${docType}s/${selectedDocument}`
    try {
      const response = await axios.put(endpoint, {
        title,
        description,
        body,
      })
      if (response.status === 200) {
        alert("Document updated successfully!")
        setTitle("")
        setDescription("")
        setBody("")
        setSelectedDocument("") // Reset the "Select document by Title" option
      } else {
        alert("Failed to update document")
      }
    } catch (error) {
      console.error(error)
      alert("Failed to update document")
    }
    setLoading(false)
    setActionTrigger(actionTrigger + 1) // Trigger fetching of new data
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////
  // Function to handle deletion of a selected document

  const handleDelete = async () => {
    setLoading(true)
    const endpoint = `http://localhost:3001/api/${docType}s/${selectedDocument}`
    try {
      const response = await axios.delete(endpoint)
      if (response.status === 200) {
        alert("Document deleted successfully!")
        setTitle("")
        setDescription("")
        setBody("")
      } else {
        alert("Failed to delete document")
      }
    } catch (error) {
      console.error(error)
      alert("Failed to delete document")
    }
    setLoading(false)
    setActionTrigger(actionTrigger + 1) // Trigger fetching of new data
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////
  // Function to fetch details of a selected document by ID

  const fetchDocumentDetails = async (id) => {
    const endpoint = `http://localhost:3001/api/${docType}s/${id}`
    try {
      const response = await axios.get(endpoint)
      const { title, description, body } = response.data
      setTitle(title)
      setDescription(description)
      setBody(body)
    } catch (error) {
      console.error(error)
      alert("Failed to fetch document details")
    }
  }

  return (
    <Container
      className="mt-5"
      style={{
        minWidth: "33%",
        padding: "1em",
        border: "1px solid #CCC",
        backgroundColor: "rgba(255, 255, 255, 0.7)",
      }}
    >
      {/* Row for Document Type Selection */}
      <Row className="mt-4 mb-4">
        <Col>
          <Form.Label className="fs-5">
            Select document type to manage
          </Form.Label>
          <Card>
            <Card.Body>
              {/* Radio buttons for selecting the document type */}
              <Form.Check
                type="radio"
                label="Resume"
                name="docType"
                value="resume"
                checked={docType === "resume"}
                onChange={handleDocTypeChange} // Triggers when radio button state changes
              />
              <Form.Check
                type="radio"
                label="Job Description"
                name="docType"
                value="jobDescription"
                checked={docType === "jobDescription"}
                onChange={handleDocTypeChange} // Triggers when radio button state changes
              />
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Form.Label className="fs-5">Select operation to perform</Form.Label>
          <Card>
            <Card.Body>
              {/* Dropdown for Operation Selection */}
              <Form.Select
                onChange={handleOperationChange}
                style={{ width: "100%" }}
              >
                <option value="">
                  Select an operation to perform on a document
                </option>
                <option value="create">Create </option>
                <option value="update">Update </option>
                <option value="delete">Delete </option>
              </Form.Select>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Conditional Render for Create Operation */}
      {operation === "create" && (
        <Row className="mt-4 mb-4">
          <Col>
            <Card>
              <Card.Body>
                {/* Form for new document creation */}
                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} // Update title state
                    placeholder="Enter a title"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)} // Update description state
                    placeholder="Enter a description"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Body</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={20}
                    value={body}
                    onChange={(e) => setBody(e.target.value)} // Update body state
                    placeholder="Enter the body"
                    style={{ width: "100%", minHeight: "200px" }}
                  />
                </Form.Group>
                {/* Save Button with Loading Indicator */}
                <Button onClick={handleCreate} disabled={loading}>
                  {loading ? <Spinner animation="border" size="sm" /> : "Save"}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {/* Conditional Render for Update Operation */}
      {operation === "update" && (
        <Row className="mt-4">
          <Col>
            <Card>
              <Card.Body>
                {/* Form for document update */}
                <Form.Label>Select document by Title</Form.Label>
                <Form.Select
                  onChange={(e) => {
                    setSelectedDocument(e.target.value)
                    fetchDocumentDetails(e.target.value) // Fetch document details on select
                  }}
                  value={selectedDocument}
                >
                  <option value="">Choose from the list</option>
                  {/* Dynamically populate dropdown with document titles */}
                  {documentList.map((doc) => (
                    <option key={doc._id} value={doc._id}>
                      {doc.title}
                    </option>
                  ))}
                </Form.Select>
                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} // Update title state
                    placeholder="Enter a title"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)} // Update description state
                    placeholder="Enter a description"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Body</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={10}
                    value={body}
                    onChange={(e) => setBody(e.target.value)} // Update body state
                    placeholder="Enter the body"
                  />
                </Form.Group>
                {/* Update Button with Loading Indicator */}
                <Button onClick={handleUpdate} disabled={loading}>
                  {loading ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    "Update"
                  )}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {/* Conditional Render for Delete Operation */}
      {operation === "delete" && (
        <Row className="mt-4">
          <Col>
            <Card>
              <Card.Body>
                {/* Form for document deletion */}
                <Form.Label>Select document by Title</Form.Label>
                <Form.Select
                  onChange={(e) => {
                    setSelectedDocument(e.target.value)
                    fetchDocumentDetails(e.target.value) // Fetch document details on select
                  }}
                  value={selectedDocument}
                >
                  <option value="">Choose from the list</option>
                  {/* Populate dropdown with document titles */}
                  {documentList.map((doc) => (
                    <option key={doc._id} value={doc._id}>
                      {doc.title}
                    </option>
                  ))}
                </Form.Select>
                {/* Readonly details of the selected document */}
                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control type="text" value={title} readOnly />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control type="text" value={description} readOnly />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Body</Form.Label>
                  <Form.Control as="textarea" rows={10} value={body} readOnly />
                </Form.Group>
                {/* Delete Button with Loading Indicator */}
                <Button onClick={handleDelete} disabled={loading}>
                  {loading ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    "Delete"
                  )}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  )
}

export default Documents
