import React, { useEffect, useState, useRef } from 'react';
import {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableFooter,
  Box
} from "@mui/material";
import { BoxCardFull, ImageNotFound } from "src/constants/componentsPersonalite";
import CheckIcon from '@mui/icons-material/Check';
import { TextFieldNumeric, TableStickyContainer} from 'src/constants/componentsPersonalite';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';

const DetalleRecepcion = ({ listaProducto, eliminarProducto, OpenModal, total, setTotal, totalIva5, setTotalIva5, totalIva10, setTotalIva10, totalIva, setTotalIva }) => {
  const [cantEsperadaActual, setCantEsperadaActual] = useState(1);
  const [cantRecibidaActual, setCantRecibidaActual] = useState(0);
  const [enEdicion, setEnEdicion] = useState(null);
  const [eliminado, setEliminado] = useState(false);

  const handleEditar = (producto, index) => {
    setEnEdicion(index === enEdicion ? null : index);
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
      flujoIva();
      recalcularTotales();
    } else {
      setCantEsperadaActual(1);
      setCantRecibidaActual(1);
      console.log("Lista de productos en recepcion detalle");
      console.log(listaProducto);
      setEnEdicion(listaProducto.length - 1);
    }
  }, [listaProducto]);

  const recalcularTotales = () => {
    let totalSuma = listaProducto.reduce((acc, product) => acc + product.Subtotal, 0);
    setTotal(totalSuma);
  }

  const handleAceptar = (index) => {
    console.log("handleAceptar")
    console.log(listaProducto);
    // debugger
    listaProducto[index].CantidadRecibida = cantRecibidaActual;
    listaProducto[index].CantidadEsperada = cantEsperadaActual;
    listaProducto[index].Subtotal = listaProducto[index].Precio * cantEsperadaActual;
    flujoIva();
    recalcularTotales();
    setEnEdicion(null);
  };

  const handleEliminar = (index) => {
    eliminarProducto(index);
    setEliminado(true);
  };

  const flujoIva = () => {
    let iva5= 0, iva10 = 0, ivaTotal = 0;
    let productos = [];
    listaProducto.forEach((item) => {
      productos = agregarProducto(item.Precio, item.Iva, item.CantidadEsperada, productos);
    })
    iva5 = calcularSubTotalIVA(5,productos);
    iva10 = calcularSubTotalIVA(10, productos);
    ivaTotal = calcularTotalIva(iva5, iva10);
    setTotalIva5(iva5);
    setTotalIva10(iva10);
    setTotalIva(ivaTotal);
  }

// Función para agregar un producto a la lista
  const agregarProducto = (costo, porcentajeIVA, cantidad, productos = []) => {
    let producto = {
      costo: costo,
      porcentajeIVA: porcentajeIVA,
      cantidad: cantidad,
      iva: function() {
        return this.costo * this.cantidad * (this.porcentajeIVA / 100);
      }
    };
    productos.push(producto);
    return productos;
  }

// Función para calcular el total del IVA para un porcentaje dado
  const calcularSubTotalIVA = (porcentaje, productos = []) => {
    let total = productos.reduce(function(acumulador, producto) {
      if (producto.porcentajeIVA === porcentaje) {
        return acumulador + producto.iva();
      } else {
        return acumulador;
      }
    }, 0);
    return total;
  }

  const calcularTotalIva = (sumIva5, sumIva10) => {
    let totalIva = 0;
    return sumIva5 + sumIva10;
  }

  const renderButton = (index, producto) => {
    if (index === enEdicion) {
      return (
        <IconButton aria-label="confirm" size="large"
                    onClick={() => handleAceptar(index)}>
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
                    onClick={() => handleEliminar(index)}
        >
          <DeleteIcon />
        </IconButton>
      </>)
    }
  }

  const renderCantidadEsperada = (index, producto) => {
    if (index === enEdicion) {
      return (
        <TextFieldNumeric
          inputRef={inputRef}
          label={producto.Medida}
          onChange={(event) => setCantEsperadaActual(event.target.value)}
          value={cantEsperadaActual || 0}
        />
      );
    } else {
      return (
        <>
          {producto.CantidadEsperada}-{producto.Medida}
        </>

      )
    }
  }

  const renderCantidadRecibida = (index, producto) => {
    if (index === enEdicion) {
      return (
        <TextFieldNumeric
          inputRef={inputRef}
          label={producto.Medida}
          onChange={(event) => setCantRecibidaActual(event.target.value)}
          value={cantRecibidaActual || 0}
        />
      );
    } else {
      return (
        <>
          {producto.CantidadRecibida}-{producto.Medida}
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
            <TableCell >Cantidad Esperada</TableCell>
            <TableCell >Cantidad Recibida</TableCell>
            <TableCell >Iva</TableCell>
            <TableCell >Precio Unitario</TableCell>
            <TableCell >Subtotal</TableCell>
            <TableCell >Acciones</TableCell>
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
            listaProducto.map((producto, index, indice = 0) => (
              <TableRow key={producto.Id}>
                <TableCell>{indice=index+1}</TableCell>
                <TableCell>{producto.Nombre} - {producto.Marca}</TableCell>
                <TableCell>{renderCantidadEsperada(index, producto)}</TableCell>
                <TableCell>{renderCantidadRecibida(index, producto)}</TableCell>
                <TableCell>{producto.Iva}</TableCell>
                <TableCell align="center">{producto.Precio}</TableCell>
                <TableCell align="center"> {producto.Subtotal}</TableCell>
                <TableCell>
                  {renderButton(index, producto)}
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

      </TableStickyContainer>

      <BoxCardFull>
        <TableRow>
          <TableCell colSpan={8} align="right">SubTotal Iva 5:</TableCell>
          <TableCell align="center">{totalIva5}</TableCell>
          <TableCell colSpan={8} align="right">SubTotal Iva 10:</TableCell>
          <TableCell align="center">{totalIva10}</TableCell>
          <TableCell colSpan={8} aling="right">Total Iva:</TableCell>
          <TableCell align="center">{totalIva}</TableCell>
          <TableCell colSpan={8} align="right">Total:</TableCell>
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

export default DetalleRecepcion;
