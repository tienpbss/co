import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";

import { AuthContext } from "src/context";

function Header() {
  const { currentUser } = useContext(AuthContext);
  return (
    <Navbar expand="md" className="bg-body-tertiary">
      <Container fluid="md">
        <Navbar.Brand href="#home">Conduit</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            {currentUser ? (
              <>
                <Nav.Link as={Link} to="/login">
                  <i className="bi bi-pencil-square"></i>
                  <span className="ms-1">New Article</span>
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  <i className="bi bi-gear-fill"></i>
                  <span className="ms-1">Settings</span>
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  <Image src={currentUser.image} width={30} roundedCircle />
                  <span className="ms-1">{currentUser.username}</span>
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  Sign in
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  Sign up
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
