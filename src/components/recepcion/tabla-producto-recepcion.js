import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button
} from "@mui/material";
import { ImageNotFound } from "src/constants/componentsPersonalite";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const TablaProductosEnRecepcion = ({ searchResult, handleClick, cantidad }) => {

  const styleTable = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };

  return (
    <Table >
      <TableHead>
        <TableRow>
          <TableCell>Nombre</TableCell>
          <TableCell >Marca</TableCell>
          <TableCell >Categoria</TableCell>
          <TableCell >Agregar</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {searchResult.length !== 0 ? (
          searchResult.map((producto) => (
            <TableRow key={producto.Id}>
              <TableCell >{producto.Nombre}</TableCell>
              <TableCell >{producto.Marca}</TableCell>
              <TableCell >{producto.Categoria}</TableCell>
              <TableCell>
                <Button variant="contained"
                        onClick={(event) => handleClick(event, producto)}
                        endIcon={<AddShoppingCartIcon />}>
                  Agregar
                </Button>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={10}
                       align="center">
              <ImageNotFound />
            </TableCell>
          </TableRow>
        )}
      </TableBody>

    </Table >
  );
};

export default TablaProductosEnRecepcion;
