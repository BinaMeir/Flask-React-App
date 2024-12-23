import React from "react";
import "../styles/Header.css";
import logo from "../assets/jooba-logo.png"; 

const Header = () => {
  return (
    <header className="header">
      <img src={logo} alt="Jooba Logo" className="logo" />
      <div className="language-toggle">
        <button className="language-btn">ENG</button>
        <button className="language-btn">Hebrew</button>
      </div>
    </header>
  );
};

export default Header;

