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
        concurrency 있음
      </button>
      <button
        className="nav-item"
        onClick={() => navigate("/no-concurrency", { replace: true })}
      >
        concurrency 없음
      </button>
    </div>
  );
}

export default Header;
