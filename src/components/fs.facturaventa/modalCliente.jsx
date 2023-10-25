import React, { useState } from 'react'
import { TextField, Box, Grid, Typography, FormControl, Button } from '@mui/material';
import PropTypes from 'prop-types'

const ModalCliente = ({ }) => {
  const [nombre, setNombre] = useState("");
  const [ruc, setRuc] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ nombre, ruc, email, telefono });
  };
  return (
    <FormControl>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">Agregar nuevo cliente</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            margin="normal"
            fullWidth
            id="nombre"
            label="Nombre o Razón Social"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            margin="normal"
            fullWidth id="fullWidth"
            label="RUC o C.I."
            value={ruc}
            onChange={(e) => setRuc(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            margin="normal"
            fullWidth
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required={false}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            margin="normal"
            fullWidth
            id="telefono"
            label="Teléfono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            required={false}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" type="submit">
            Agregar
          </Button>
        </Grid>
      </Grid>
    </FormControl>

  )
}

ModalCliente.propTypes = {}

export default ModalCliente;
/*<Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="stretch"
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
    >
      <Grid item>
        <TextField
          sx={12}
          required
          id="outlined-required"
          label="Nombre o Razón Social"
        />
      </Grid>
      <Grid item>
        <TextField
          required
          id="outlined-required"
          label="RUC o Ci"
        />
      </Grid>
      <Grid item>
        <TextField
          required
          id="outlined-required"
          label="Email"
        />
      </Grid>


    </Grid>*/