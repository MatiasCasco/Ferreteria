import React from 'react';
import { TextField, InputAdornment,SearchIcon } from '@mui/material';

const BuscadorProductos = ({ handleChange, searchTerm }) => {
    return (
      <TextField
        value={searchTerm}
        onChange={handleChange}
        placeholder="Buscar Producto"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    );
  };
export default BuscadorProductos;