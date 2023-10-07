import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import retro_toys_logo from "../images/retro_toys_logo.png";

const Header = (props) => {
  const isLoggedInOn = useSelector((state) => state.user.isLoggedIn);

  return (
    <div>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="success"
        variant="dark"
        className="navbar navbar-dark bg-success"
      >
        <Container>
          <Navbar.Brand href="/">
            <img src={retro_toys_logo} width="140" alt="retro_toys" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav" className="pc_navbar">
            <Nav className="me-right">
              <Link to="/" className="header-menu">
                Top
              </Link>
              <Link to="/about" className="header-menu">
                About
              </Link>
              {isLoggedInOn === false && (
                <Link to="/login" className="header-menu">
                  Login
                </Link>
              )}
              {isLoggedInOn === false && (
                <Link to="/signup" className="header-menu">
                  Signup
                </Link>
              )}
              {isLoggedInOn === true && (
                <Link to="/post" className="header-menu">
                  Create Post
                </Link>
              )}
              {isLoggedInOn === true && (
                <Link to="/messagerooms" className="header-menu">
                  Message Room
                </Link>
              )}
              {isLoggedInOn === true && (
                <Link to="/my_posts_list_page" className="header-menu">
                  My Posts
                </Link>
              )}
              {isLoggedInOn === true && (
                <Link to="/liked_posts_list_page" className="header-menu">
                  Liked Posts
                </Link>
              )}
              {isLoggedInOn === true && (
                <Link to="/mypage" className="header-menu">
                  My Profile
                </Link>
              )}
              {isLoggedInOn === true && (
                <Link to="/logout" className="header-menu">
                  Logout
                </Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
