import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

function Header() {
  const navigate = useNavigate();
  return (
    <div className="nav-container">
      <button
        className="nav-item"
        onClick={() => navigate("/", { replace: true })}
      >
        R-18
      </button>
      <button
        className="nav-item"
        onClick={() => navigate("/no-concurrency", { replace: true })}
      >
        R-17
      </button>
    </div>
  );
}

export default Header;
