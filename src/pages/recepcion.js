import * as React from 'react';
import Head from 'next/head';
import { Box, Container, Grid, Card, CardContent } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import { RecepcionEncabezado } from '../components/recepcion/recepcion-encabezado';
import { BoxMain, FullWidthGridItem, IconButtonClose, MaterialModal } from '../constants/componentsPersonalite';
import Toolbar from '@mui/material/Toolbar';
import Slide from '@mui/material/Slide';
import { useState, useEffect } from 'react';
import DetalleRecepcion from '../components/recepcion/detalle-recepcion';
import ModalRecepcion from '../components/recepcion/modal-recepcion';
import ModalAddProduct from '../components/recepcion/modal-add-product';

export const ProductsContext = React.createContext([]);
export const DialogContext = React.createContext([]);

const Recepcion = () => {

  const [productos, setProductos] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [addProductIsOpen, setAddProductIsOpen] = useState(false);
  const [total, setTotal] = useState(0);
  const [total5, setTotal5] = useState(0);
  const [total10, setTotal10] = useState(0);
  const [totalIva, setTotalIva] = useState(0);


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

  const handleAddProduct = () => {
    setAddProductIsOpen(!addProductIsOpen);
  }

  const handleAddProductClose = () => {
    setAddProductIsOpen(false);
  }

  return (<>
      <Head>
        <title>
          Proceso Recepción
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 2
        }}
      >
        {/*<CrudProductsContainer/>*/}
        <RecepcionEncabezado OpenModal = {handleAddProduct} listaProducto = {productos}/>
        <BoxMain>
          <Container>
           {/* <Cabecera />*/}
            <Grid container>
              <FullWidthGridItem>
                <DetalleRecepcion
                  listaProducto = {productos}
                  eliminarProducto = {eliminarProducto}
                  OpenModal = {handleModal}
                  total = {total}
                  setTotal = {setTotal}
                  totalIva5 = {total5}
                  setTotalIva5 = {setTotal5}
                  totalIva10 = {total10}
                  setTotalIva10 = {setTotal10}
                  totalIva = {totalIva}
                  setTotalIva = {setTotalIva}
                />
              </FullWidthGridItem>
            </Grid>
            <MaterialModal
              openModal={modalIsOpen}
              handleClose={handleClose} >
              <Toolbar sx={{ display: "flex", justifyContent: "flex-end" }}>
                <IconButtonClose onClick={handleClose} />
              </Toolbar >
              <ProductsContext.Provider value={[productos, setProductos]}>
                <ModalRecepcion
                  onRequestClose={() => handleModal()}
                />
              </ProductsContext.Provider>
            </MaterialModal>
              <MaterialModal openModal={addProductIsOpen} handleClose={handleAddProductClose}>
                <Toolbar sx={{ display: "flex", justifyContent: "flex-end", margin: '0px'}}>
                  <IconButtonClose onClick={handleAddProductClose} />
                </Toolbar >
                <div className={'form-container'}>
                  <ModalAddProduct onRequestClose={() => handleAddProduct()}/>
                </div>
              </MaterialModal>


          </Container>
        </BoxMain >
      </Box>
    </>
  );
}

Recepcion.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);
export default Recepcion;
