import React from "react";
import "../styles/MainSection.css";

const MainSection = () => {
  return (
    <div className="main-section">
      <div className="frame">
        <h2>The Clock is Ticking</h2>
      </div>
      <p>Are you ready to guess?</p>
      <img src="mockups.png" alt="Clock Illustration" />
    </div>
  );
};

export default MainSection;
