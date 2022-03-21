import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

function Header() {
const noConcurrencyUrl =
  "http://" + window.location.hostname + ":3001/";
  const navigate = useNavigate();
  return (
    <div className="nav-container">
      <button
        className="nav-item nav-item-button"
        onClick={() => navigate("/", { replace: true })}
      >
        R-18
      </button>
      <a
        className="nav-item nav-item-a"
        href={noConcurrencyUrl}
      >
        R-17
      </a>
    </div>
  );
}

export default Header;
