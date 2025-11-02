import { useState } from "react";
import {
  Button,
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
} from "react-bootstrap";
import { useSelector } from "react-redux";

import { Link, useNavigate } from "react-router-dom";
import "./TopNavBar.css";

const TopNavBar = () => {
  const { profile } = useSelector((state) => state.user);

  const [text, setText] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (text.trim()) {
      navigate(`/property?text=${encodeURIComponent(text.trim())}`);
    }
  };

  return (
    <Navbar bg="white" expand="lg" className="shadow-sm py-2 sticky-top">
      <Container fluid className="px-4 px-md-5">
        <Navbar.Brand
          as={Link}
          to="/"
          className="fw-bold fs-4 text-primary d-flex align-items-center"
        >
          <img
            width="40"
            height="40"
            src="https://img.icons8.com/color/48/property.png"
            alt="property"
          />
          <span className="ms-2">SmartStay Pvt. Ltd.</span>

          <Nav className="m-1">
            <Link to="/property/add" className="text-decoration-none">
              <Button
                variant="outline-primary"
                className="fw-semibold rounded-pill px-4"
              >
                + Add Property
              </Button>
            </Link>
          </Nav>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className="justify-content-end">
          <Form
            className="d-flex align-items-center me-3 search-form"
            onSubmit={(e) => e.preventDefault()}
          >
            <FormControl
              type="search"
              placeholder="Search properties..."
              className="search-input"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <Button
              variant="primary"
              className="search-btn"
              onClick={handleSearch}
            >
              <i className="bi bi-search"></i>
            </Button>
          </Form>

          {profile ? (
            <Nav>
              <Link to="profile" className="text-decoration-none">
                <Button
                  variant="outline-primary"
                  className="fw-semibold rounded-pill px-4"
                >
                  Profile
                </Button>
              </Link>
            </Nav>
          ) : (
            <Nav>
              <Link to="/auth/login" className="text-decoration-none">
                <Button
                  variant="outline-primary"
                  className="fw-semibold rounded-pill px-4"
                >
                  Login
                </Button>
              </Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default TopNavBar;
