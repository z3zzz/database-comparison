import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css"

function Header() {
  const navigate = useNavigate();
  return (
    <div className="nav-container">
      <button
        className="nav-item"
        onClick={() => navigate("/", { replace: true })}
      >
        뉴스보드
      </button>
    </div>
  );
}

export default Header;
