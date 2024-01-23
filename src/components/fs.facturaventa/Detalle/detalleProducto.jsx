import React, { useEffect, useState, useRef } from 'react';
import {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableFooter,
  Box
} from "@mui/material";
import { BoxCardFull, GridItemandCard, IconButtonAdd, ImageNotFound } from "src/constants/componentsPersonalite";
import CheckIcon from '@mui/icons-material/Check';
import { TextFieldNumeric, TableStickyContainer} from 'src/constants/componentsPersonalite';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';


const DetalleProducto = ({ listaProducto, eliminarProducto, OpenModal, total, setTotal }) => {

  const [cantidadActual, setCantidadActual] = useState(1);
  const [enEdicion, setEnEdicion] = useState(null);
  const [eliminado, setEliminado] = useState(false);

  const handleEditar = (producto, index) => {
    setEnEdicion(index === enEdicion ? null : index);
    console.log(cantidadActual)
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
    if (eliminado) {
      setEliminado(false);
      recalcularTotales();
    } else {
      setCantidadActual(1);
      setEnEdicion(listaProducto.length - 1);
    }
  }, [listaProducto]);

  const recalcularTotales = () => {
    let totalSuma = listaProducto.reduce((acc, product) => acc + product.Subtotal, 0);
    setTotal(totalSuma);
  }

  const handleAceptar = (index) => {
    listaProducto[index].Cantidad = cantidadActual;
    listaProducto[index].Subtotal = listaProducto[index].Precio * cantidadActual;
    recalcularTotales();
    setEnEdicion(null);
  };

  const handleEliminar = (index) => {
    eliminarProducto(index);
    setEliminado(true);
   
  };



  const renderButton = (index, producto) => {
    if (index === enEdicion) {
      return (
        <IconButton aria-label="confirm"
         size="large"
          onClick={() => handleAceptar(index)}>
          <CheckIcon />
        </IconButton>
      )
    } else {
      return (<>
        <IconButton aria-label="Edit"
         size="large"
          onClick={() => handleEditar(producto, index)}>
          <ModeEditIcon />
        </IconButton>
        <IconButton aria-label="delete"
         size="large"
          onClick={() => handleEliminar(index)}
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
          value={cantidadActual || 0}
          onKeyPress={(event) => { 
           if (event.key === 'Enter') {  handleAceptar(index); }
          }}
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
              <Box display="flex"
               justifyContent="flex-end">
                <IconButton onClick={OpenModal}>
                  <AddBusinessIcon />
                </IconButton>
              </Box>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listaProducto.length !== 0 ? (
            listaProducto.map((producto, index) => (
              <TableRow key={producto.Id}>
                <TableCell>{index}</TableCell>
                <TableCell >{producto.Nombre} - {producto.Marca}</TableCell>
                <TableCell align="center">{producto.Precio}</TableCell>
                <TableCell align="center">
                  {renderCantidad(index, producto)}
                </TableCell >
                <TableCell align="center"> {producto.Subtotal}</TableCell>
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
        <TableRow>
          <TableCell colSpan={8}
           align="right">Total:</TableCell>
          <TableCell align="center">{total}</TableCell>
          <TableCell colSpan={2}>
            <IconButton onClick={OpenModal}>
              <AddBusinessIcon />
            </IconButton>
          </TableCell>
        </TableRow>

      </BoxCardFull>

    </>
  );
};

export default DetalleProducto;
