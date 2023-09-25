import React, { useEffect, useState, useRef } from 'react';
import {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box
} from "@mui/material";
import { BoxCardFull, GridItemandCard, IconButtonAdd, ImageNotFound } from "src/constants/componentsPersonalite";
import CheckIcon from '@mui/icons-material/Check';
import { TextFieldNumeric, TableStickyContainer, PrimaryButton } from 'src/constants/componentsPersonalite';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';



const DetalleProducto = ({ listaProducto, handleCantChange, handleClick, cantidad, OpenModal }) => {

  const [cantidadActual, setCantidadActual] = useState(0);
  const [enEdicion, setEnEdicion] = useState(null);

  const handleEditar = (producto, index) => {
    setEnEdicion(index === enEdicion ? null : index);
    setCantidadActual(producto.Cantidad);
  };

  

  // llama al método focus() cuando el componente se monta o cuando cambia
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      enEdicion
    }
  }, [enEdicion]);

  const inputRef = useRef();
  useEffect(() => {
    setEnEdicion(listaProducto.length - 1);
  }, [listaProducto]);

  const handleAceptar = (producto, index) => {
    // Aquí va tu lógica para aceptar los cambios
    setEnEdicion(null);
  };

  const handleEliminar = (producto) => {
    // Aquí va tu lógica para eliminar el producto
    console.log("eliminado " + producto);
  };

  handleChangeCantidad = ()=>{
//aqui agregar codigo para cambiar
  }

  const renderButton = (index, producto) => {
    if (index === enEdicion) {
      return (
        <IconButton aria-label="confirm" size="large"
          onClick={() => handleAceptar(producto, index)}>
          <CheckIcon />
        </IconButton>
      )
    } else {
      return (<>
        <IconButton aria-label="Edit" size="large"
          onClick={() => handleEditar(producto, index)}>
          <ModeEditIcon />
        </IconButton>
        <IconButton aria-label="delete" size="large"
          onClick={() => handleEliminar(producto)}
        >
          <DeleteIcon />
        </IconButton>
      </>)
    }
  }

  const renderCantidad = (index, producto) => {
    if (index === enEdicion) {
      return (
        <TextFieldNumeric
          inputRef={inputRef}
          label={producto.Medida}
          onChange={(event) => setCantidadActual(event.target.value)}
          value={producto.Cantidad || 0}
        />
      );
    } else {
      return (
        <>
          {producto.Cantidad}-{producto.Medida}
        </>

      )
    }
  }


  return (
    <>
      <TableStickyContainer>
        <TableHead>
          <TableRow>
            <TableCell >Nro.</TableCell>
            <TableCell >Descripcion</TableCell>
            <TableCell >Precio Unitario</TableCell>
            <TableCell >Cantidad</TableCell>
            <TableCell >Subtotal</TableCell>
            <TableCell >Accion</TableCell>
            <TableCell colSpan={8}>
              <Box display="flex" justifyContent="flex-end">
                <IconButton onClick={OpenModal}>
                  <AddBusinessIcon />
                </IconButton>
              </Box>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody
        >
          {listaProducto.length !== 0 ? (
            listaProducto.map((producto, index) => (
              <TableRow key={producto.Id}>
                <TableCell>{index}</TableCell>
                <TableCell >{producto.Nombre} - {producto.Marca}</TableCell>
                <TableCell align="center">{producto.Precio}</TableCell>
                <TableCell align="center">
                  {renderCantidad(index, producto)}
                </TableCell >
                <TableCell align="center"> 154546</TableCell>
                <TableCell>
                  {renderButton(index, producto)}
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
      </TableStickyContainer>

      <BoxCardFull>
        <IconButtonAdd
          onClick={OpenModal}
        />
      </BoxCardFull>

    </>
  );
};

export default DetalleProducto;
