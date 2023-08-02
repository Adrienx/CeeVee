import { NavLink } from "react-router-dom"
import { Navbar, Nav, Container } from "react-bootstrap"

const CustomNav = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        {" "}
        {/* Notice the change here to make container full-width */}
        <Navbar.Brand as={NavLink} exact to="/GenerateDocument">
          <div className="animated-word fs-1">
            <div className="letter">C</div>
            <div className="letter">e</div>
            <div className="letter">e</div>
            <div className="letter">V</div>
            <div className="letter">e</div>
            <div className="letter">e</div>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <div className="ml-auto">
            {" "}
            {/* Wrapper div */}
            <Nav>
              <Nav.Link
                as={NavLink}
                to="/Documents"
                activeStyle={{ fontWeight: "bold" }}
              >
                Manage Documents
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                to="/UserProfile"
                activeStyle={{ fontWeight: "bold" }}
              >
                User Profile
              </Nav.Link>
            </Nav>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default CustomNav
