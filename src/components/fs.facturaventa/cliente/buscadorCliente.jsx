import React from 'react';
import { TextField, InputAdornment,Box } from '@mui/material';
import Grid from '@material-ui/core/Grid';
import BadgeIcon from '@mui/icons-material/Badge';

const BuscadorCliente = ({ setSearchTerm, placeholder }) => {
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <BadgeIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
            <TextField id="input-with-sx" 
              onChange={handleChange}
              label={placeholder}
              variant="standard"
            />
          </Box>
  );
};

export default BuscadorCliente;