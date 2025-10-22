import React, { useState } from "react";
import "./header.css";
import logo from "../assets/svtlogo.png";

function Header({ onSearchChange }) {
  const [value, setValue] = useState("");
  const [show, setShow] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") onSearchChange(value.toLowerCase());
  };

  return (
    <header className="header">
      <div className="header-top">
        <img src={logo} alt="Seventeen logo" className="logo" onClick={() => setShow(true)} />
        <h1 className="header-title">SEVENTEEN ALBUMS</h1>
      </div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search ..."
          className="search-bar"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      {show && (
        <div className="modal-overlay" onClick={() => setShow(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>SEVENTEEN</h2>
            <p>
              SEVENTEEN is a South Korean boy band formed by Pledis Entertainment in 2015.
              The group has 13 members in three units — Hip-Hop, Vocal, and Performance.
              They’re known for producing their own music and choreography, earning the title
              “self-producing idols.”
            </p>
            <button onClick={() => setShow(false)}>Close</button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;






