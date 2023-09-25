import React, { useState, useContext, useEffect } from 'react';
import Modal from 'react-modal';
import ModalProducto from '../components/fs.facturaventa/modalProducto2';
import { Container, Grid } from '@mui/material';
import { PrimaryButton, H4Typography, FullWidthGridItem, BoxMain, IconButtonClose } from 'src/constants/componentsPersonalite';
import DetalleProducto from 'src/components/fs.facturaventa/Detalle/detalleProducto';
import Cabecera from 'src/components/fs.facturaventa/cabecera';

import Slide from '@mui/material/Slide';


import { Grow } from '@mui/material';
import { Fade } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';


export const ProductosContext = React.createContext([]);
export const DialogContext = React.createContext([]);

const FacturaVentaAi = () => {
  const colums = ["Id", "Nombre", "Iva", "Categoria", "Precio", "Marca", "Cantidad", "Subtotal"];
  const [productos, setProductos] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [total, setTotal] = useState(0);

  const handleModal = () => {
    setModalIsOpen(!modalIsOpen);
  }

  const handleAgregarProducto = (producto) => {
    setProductos([...productos, producto]);
    setModalIsOpen(false);
  };
  useEffect(() => {
    Modal.setAppElement('body');
  }, []);

  useEffect(() => {
    let totalSuma = productos.reduce((acc, product) => acc + product.Subtotal, 0);
    setTotal(totalSuma);
  }, [productos]);

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  const handleClose = () => {
    setModalIsOpen(false);
  };

  return (
    <BoxMain>
      <Container>
        <Cabecera />
        <Grid container>
          <FullWidthGridItem>
            <DetalleProducto
              listaProducto={productos}
              handleCantChange={() => console.log("change")}
              handleClick={() => console.log("change")}
              cantidad={1}
              OpenModal={handleModal}
            />
          </FullWidthGridItem>
        </Grid>
        <Grid container>
          <FullWidthGridItem xs={8}>
            <H4Typography>
              Detalle
            </H4Typography>
          </FullWidthGridItem>
          <FullWidthGridItem xs={4}>
            <H4Typography>
              Total: {total}
            </H4Typography>
          </FullWidthGridItem>
        </Grid>


        <Dialog fullScreen open={modalIsOpen} onClose={handleClose} TransitionComponent={Grow} >
          <Toolbar sx={{ display: "flex", justifyContent: "flex-end" }}>
            <IconButtonClose onClick={handleClose} />
          </Toolbar >
          <ProductosContext.Provider value={[productos, setProductos]}>
            <ModalProducto
              onRequestClose={() => handleModal()}
            />
          </ProductosContext.Provider>
        </Dialog >
      </Container>
    </BoxMain >
  );
};

export default FacturaVentaAi;
/**
 * <Grid container>
          <FullWidthGridItem xs={8}>
            <H4Typography>
              Productos
            </H4Typography>
          </FullWidthGridItem>
          <FullWidthGridItem xs={4}>
            <PrimaryButton onClick={() => handleModal()}>
              Agregar Producto
            </PrimaryButton>
          </FullWidthGridItem>
        </Grid> 
 */