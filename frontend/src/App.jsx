import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Header from "./components/Header";
import GuessingGame from "./components/GuessingGame";
import "./styles/App.css";

const App = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="app-container">
        <Header />
        <GuessingGame></GuessingGame>
      </div>
    </LocalizationProvider>
  );
};

export default App;
