import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@mui/icons-material/Search';

const Buscador = ({ setSearchTerm, placeholder }) => {
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Grid container
      justifyContent="flex-end">
      <Grid item>
        <TextField
          onChange={handleChange}
          placeholder = {placeholder}
          InputProps={{
            startAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
    </Grid>
  );
};

export default Buscador;