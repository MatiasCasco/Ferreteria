import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@mui/icons-material/Search';

const BuscadorProductos = ({ setSearchTerm }) => {
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Grid container justify="flex-end">
      <Grid item>
        <TextField
          onChange={handleChange}
          placeholder="Buscar Producto"
          inputProps={{
            style: {

            }
          }}
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

export default BuscadorProductos;