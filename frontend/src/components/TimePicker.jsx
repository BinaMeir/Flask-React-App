import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime"; // For clock icon
import "../styles/TimePicker.css";
import { BASE_API_URL } from "../constants";
import axios from 'axios';

const CustomTimePicker = ({selectedLocation, update_wins}) => {
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");

  const handleHourChange = (e) => {
    const value = e.target.value;
    if (value === "" || (Number(value) >= 0 && Number(value) <= 23)) {
      setHour(value);
    }
  };

  const handleMinuteChange = (e) => {
    const value = e.target.value;
    if (value === "" || (Number(value) >= 0 && Number(value) <= 59)) {
      setMinute(value);
    }
  };

  const handleOk = async () => {
    if (!selectedLocation || !hour || !minute) {
      alert("Please select a location and time.");
      return;
    }

    const time = `${hour}:${minute}`;
    const uid = "1";//need to change this

    try {
        const response = await axios.post(BASE_API_URL + "/submit_guess", {
            uid: uid,
            location: selectedLocation,  
            time: time          
        });
    
        if (response.status === 201) {
          console.log("Data submitted successfully.");
          if(response.data.iscorrect){
            alert("you won!!");
            update_wins();
          }else{
            alert("wrong answer");
          }
        } else {
          console.error("Error submitting data.");
        }
      } catch (error) {
        console.error("Network error:", error);
      } finally{
        handleCancel();
      }
  };

  const handleCancel = () => {
    setHour("");
    setMinute("");
  };

  return (
    <Box className="custom-timepicker-container">
      <Typography className="custom-timepicker-header">Enter Time</Typography>
      <Box className="custom-timepicker-input-row">
        <Box className="custom-timepicker-input-box">
          <TextField
            value={hour}
            onChange={handleHourChange}
            className="custom-timepicker-input"
            variant="outlined"
            inputProps={{
              maxLength: 2,
              style: { textAlign: "center", fontSize: "30px" },
            }}
          />
          <Typography className="custom-timepicker-label">Hour</Typography>
        </Box>
        <Box className="custom-timepicker-input-box">
          <TextField
            value={minute}
            onChange={handleMinuteChange}
            className="custom-timepicker-input"
            variant="outlined"
            inputProps={{
              maxLength: 2,
              style: { textAlign: "center", fontSize: "30px" },
            }}
          />
          <Typography className="custom-timepicker-label">Minute</Typography>
        </Box>
      </Box>
      <Box className="custom-timepicker-actions">
        <AccessTimeIcon className="custom-timepicker-icon" />
        <Box className="custom-timepicker-btn-container">
          <Button onClick={handleCancel} className="custom-timepicker-btn-cancel">
            Cancel
          </Button>
          <Button onClick={handleOk} className="custom-timepicker-btn-ok">
            OK
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CustomTimePicker;
