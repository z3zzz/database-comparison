import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Nav from "react-bootstrap/Nav";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Nav activeKey={location.pathname}>
      <Nav.Item>
        <Nav.Link onClick={() => navigate("/")}>뉴스보드</Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default Header;
