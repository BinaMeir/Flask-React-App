import React from 'react';
import "../styles/WinCard.css"

const WinCard = ({ time, location }) => {
  return (
    <div className="card">
      <div className="time">
        <h1>time: {time}</h1>
      </div>
      <div className="location">
        <p>location: {location}</p>
      </div>
    </div>
  );
};

export default WinCard;