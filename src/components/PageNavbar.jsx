import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
const PageNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>Restaurant</Navbar.Brand>
        <Nav className="ms-auto gap-4">
          <Link to="/" className="text-decoration-none text-info fw-semibold">
            Admin
          </Link>
          <Link
            to="/users"
            className="text-decoration-none text-info fw-semibold"
          >
            Users
          </Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default PageNavbar;
