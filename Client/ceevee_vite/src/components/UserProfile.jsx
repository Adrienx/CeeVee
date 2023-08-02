import React, { useState, useEffect } from "react"
import { Container, Row, Col, Button, Card, Form } from "react-bootstrap"

export default function UserProfile() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  })

  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
  })

  const [user, setUser] = useState(null)

  // Assuming you'll have a function to fetch user data
  useEffect(() => {
    // fetchUserData();
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordData({ ...passwordData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Call the backend API to update the user's information here
    console.log(formData)
  }

  const handlePasswordSubmit = (e) => {
    e.preventDefault()
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      // Show some error about passwords not matching
      return
    }

    // Call backend to update password
    console.log(passwordData)
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
      <Row className="justify-content-center mb-4">
        <Col md={6}>
          <Card>
            <Card.Header>
              <h2>User Profile Page</h2>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    placeholder={user?.firstName}
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    placeholder={user?.lastName}
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder={user?.email}
                    value={formData.email}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Button type="submit" className="px-4 mt-3">
                  Update Profile
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Header>
              <h2>Change Password</h2>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handlePasswordSubmit}>
                <Form.Group>
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Confirm New Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                  />
                </Form.Group>
                <Button type="submit" className="px-4 mt-3">
                  Change Password
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
