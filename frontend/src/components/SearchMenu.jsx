import React from 'react';
import { Autocomplete, TextField } from '@mui/material';

const SearchMenu = ({ options, setSelectedLocation }) => {
  const handleLocationChange = (event, newValue) => {
    setSelectedLocation(newValue); // Update the location in the parent component
  };

  return (
    <div className="search-menu">
      <Autocomplete
        freeSolo
        options={options}
        onChange={handleLocationChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search"
            variant="outlined"
            size="small"
          />
        )}
        sx={{
          width: 200,
          backgroundColor: '#FFFFFF',
          '& .MuiOutlinedInput-root': {
            borderRadius: '4px',
            '& fieldset': {
              borderColor: '#D9D9D9',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#5E2C8A',
          },
        }}
      />
    </div>
  );
};

export default SearchMenu;
