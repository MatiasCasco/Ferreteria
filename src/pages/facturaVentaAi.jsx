import React, { useState, useContext, useEffect } from 'react';

import ModalProducto from '../components/fs.facturaventa/modalProducto2';
import { Container, Grid } from '@mui/material';
import { FullWidthGridItem, BoxMain, IconButtonClose,MaterialModal } from 'src/constants/componentsPersonalite';
import DetalleProducto from 'src/components/fs.facturaventa/Detalle/detalleProducto';
import Cabecera from 'src/components/fs.facturaventa/cabecera';
import { DashboardLayout } from '../components/dashboard-layout';

import Slide from '@mui/material/Slide';

//import { Grow } from '@mui/material';

import Toolbar from '@mui/material/Toolbar';
//import Dialog from '@mui/material/Dialog';


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
  const eliminarProducto = (index) => {
    const nuevosProductos = productos.filter((p, i) => i !== index);
    setProductos(nuevosProductos);
  }


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
              listaProducto = {productos}
              eliminarProducto = {eliminarProducto}
              OpenModal = {handleModal}
              total = {total}
              setTotal = {setTotal}
            />
          </FullWidthGridItem>
        </Grid>


        <MaterialModal
          openModal={modalIsOpen} 
          handleClose={handleClose} >
          <Toolbar sx={{ display: "flex", justifyContent: "flex-end" }}>
            <IconButtonClose onClick={handleClose} />
          </Toolbar >
          <ProductosContext.Provider value={[productos, setProductos]}>
            <ModalProducto
              onRequestClose={() => handleModal()}
            />
          </ProductosContext.Provider>        
        </MaterialModal>

      </Container>
    </BoxMain >
  );
};
FacturaVentaAi.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default FacturaVentaAi;
/**
 *  <Dialog fullScreen open={modalIsOpen} onClose={handleClose} TransitionComponent={Grow} >
          <Toolbar sx={{ display: "flex", justifyContent: "flex-end" }}>
            <IconButtonClose onClick={handleClose} />
          </Toolbar >
          <ProductosContext.Provider value={[productos, setProductos]}>
            <ModalProducto
              onRequestClose={() => handleModal()}
            />
          </ProductosContext.Provider>
        </Dialog >

         <MaterialModal
          openModal={modalIsOpen} 
          handleClose={handleClose} >
          <Toolbar sx={{ display: "flex", justifyContent: "flex-end" }}>
            <IconButtonClose onClick={handleClose} />
          </Toolbar >
          <ProductosContext.Provider value={[productos, setProductos]}>
            <ModalProducto
              onRequestClose={() => handleModal()}
            />
          </ProductosContext.Provider>        
        </MaterialModal>


 */