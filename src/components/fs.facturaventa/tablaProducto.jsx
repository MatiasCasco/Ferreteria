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

const TablaProductos = ({ searchResult, handleCantChange, handleClick, cantidad }) => {
  const isButtonDisabled = (producto) => {
    return cantidad[producto.Id] === 0 || cantidad[producto.Id] === undefined || cantidad[producto.Id] === '';
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Nombre</TableCell>
          <TableCell >IVA</TableCell>
          <TableCell >Medida</TableCell>
          <TableCell >Categoria</TableCell>
          <TableCell >Precio</TableCell>
          <TableCell >Marca</TableCell>
          <TableCell >Cantidad</TableCell>
          <TableCell >Agregar</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {searchResult.length !== 0 ? (
            searchResult.map((producto) => (
              <TableRow key={producto.Id}>
                <TableCell >{producto.Nombre}</TableCell>
                <TableCell >{producto.Iva}</TableCell>
                <TableCell >{producto.Medida}</TableCell>
                <TableCell >{producto.Categoria}</TableCell>
                <TableCell >{producto.Precio}</TableCell>
                <TableCell >{producto.Marca}</TableCell>
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
            <TableCell colSpan = {8}
              align="center">
              <ImageNotFound />
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table >
  );
};

export default TablaProductos;
