import React, { useState } from "react"
import { Container, Row, Col, Button, Card, Form } from "react-bootstrap"
import { useHistory } from "react-router-dom"

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const history = useHistory()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Check user credentials here (you will need to call the backend API)

    // Redirect to the GenerateDocuments page upon successful login
    history.push("/GenerateDocument")
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
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Header>
              <h2>Sign In</h2>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    onChange={handleChange}
                  />
                </Form.Group>
                <Button type="submit" className="px-4 mt-3">
                  Sign In
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
