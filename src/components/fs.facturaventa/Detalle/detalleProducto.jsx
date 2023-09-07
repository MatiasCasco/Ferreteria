import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button
} from "@mui/material";
import TextField from '@mui/material/TextField';
import { ImageNotFound } from "src/constants/componentsPersonalite";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const DetalleProducto = ({ searchResult, handleCantChange, handleClick, cantidad }) => {
  const isButtonDisabled = (producto) => {
    return cantidad[producto.Id] === 0 || cantidad[producto.Id] === undefined || cantidad[producto.Id] === '';
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Nro.</TableCell>
          <TableCell>Descripcion</TableCell>
          <TableCell >Precio Unitario</TableCell>
          <TableCell >Cantidad</TableCell>
          <TableCell >Subtotal</TableCell>
          <TableCell >Accion</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {searchResult.length !== 0 ? (
          searchResult.map((producto) => (
            <TableRow key={producto.Id}>
              <TableCell >{producto.Nombre} - {producto.Marca}</TableCell>
              <TableCell >{producto.Precio}</TableCell>
              <TableCell>
                <TextField
                  id="standard-basic"
                  min="1"
                  label={producto.Medida}
                  variant="standard"
                  type='number'
                  onChange={(event) => handleCantChange(event, producto)}
                  value={cantidad[producto.Id] || ''}
                />
              </TableCell>
              <TableCell>
                <Button variant="contained"
                  disabled={isButtonDisabled(producto)}
                  onClick={(event) => handleClick(event, producto)}
                  endIcon={<AddShoppingCartIcon />}>
                  Agregar
                </Button>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={8}
              align="center">
              <ImageNotFound />
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table >
  );
};

export default DetalleProducto;
