import React, { useEffect, useState } from "react";
import TimePicker from "./TimePicker";
import MainSection from "./MainSection";
import WinsCarousel from "./WinsCarousel";
import SearchMenu from './SearchMenu';
import "../styles/GuessingGame.css"
import { BASE_API_URL } from "../constants";

const GuessingGame = () => {
      const [locations, setLocations] = useState([]);
      const [winsData, setWinsData] = useState([]);
      const [selectedLocation, setSelectedLocation] = useState("");
      const fetchLocations = async () => {
        try {
          const response = await fetch(BASE_API_URL+"/locations");
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }
          const data = await response.json();
          setLocations(data.data || []);
        } catch (error) {
          console.error("Failed to fetch locations:", error);
          setLocations([]);
        }
      };

      
      const fetchWinsData = async () => {
        try {
          const response = await fetch(BASE_API_URL+"/user/1/guesses_results");
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }
          const data = await response.json();
          console.log(data);
          setWinsData(data || []);
        } catch (error) {
          console.error("Failed to fetch wins data:", error);
          setWinsData([]);
        }
      };

      useEffect(() => {
        fetchLocations();    
        fetchWinsData();
        console.log("here");
      }, []);
    

  return (
    <div className="content">
      <div className="centered-content">
        <div className="left-side">
          <div className="search-menu">
            <SearchMenu options={locations} setSelectedLocation={setSelectedLocation}/>    
          </div>
          <div className="time-picker">
            <TimePicker selectedLocation={selectedLocation} update_wins={fetchWinsData}/>
          </div>
        </div>
        <div className="right-side">
          <MainSection />
        </div>
      </div>
      <div className="wins">
        <div className="text">Wins:</div>
        <WinsCarousel winsData={winsData} />
      </div>
    </div>
  );
};

export default GuessingGame;
