import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";

export const NavbarComponent = () => {
  return (
    <div>
      <Navbar expand="lg" variant="dark" style={{ backgroundColor: "#013220" }}>
        <Container>
          <Link to="/" className="nav-link">
            <Navbar.Brand>PDM</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link to="/" className="nav-link px-3">
                {" "}
                Home{" "}
              </Link>
              <Link to="/schedule" className="nav-link px-3">
                {" "}
                Schedule{" "}
              </Link>
              <Link to="/rank" className="nav-link px-3">
                {" "}
                Rank{" "}
              </Link>
              <Link to="/meetingRequest" className="nav-link px-3">
                {" "}
                Meeting Request{" "}
              </Link>
              <Link to="/registration" className="nav-link px-3">
                {" "}
                Register{" "}
              </Link>

              {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
            </Nav>
            <Nav className="ms-auto">
              <Link to="/settings" className="nav-link px-3">
                Profile
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};
