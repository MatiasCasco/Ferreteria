import * as React from 'react';
import Head from 'next/head';
import { Box, Container, Grid, Card, CardContent } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import { RecepcionEncabezado } from '../components/recepcion/recepcion-encabezado';
import { BoxMain, FullWidthGridItem, IconButtonClose, MaterialModal } from '../constants/componentsPersonalite';
import Cabecera from '../components/fs.facturaventa/cabecera';
import DetalleProducto from '../components/fs.facturaventa/Detalle/detalleProducto';
import Toolbar from '@mui/material/Toolbar';
import ModalProducto from '../components/fs.facturaventa/modalProducto2';
import Slide from '@mui/material/Slide';
import { useState, useEffect } from 'react';
import DetalleRecepcion from '../components/recepcion/detalle-recepcion';
import ModalRecepcion from '../components/recepcion/modal-recepcion';

export const ProductsContext = React.createContext([]);
export const DialogContext = React.createContext([]);

const Recepcion = () => {

  const [productos, setProductos] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [total, setTotal] = useState(0);
  const [total5, setTotal5] = useState(0);
  const [total10, setTotal10] = useState(0);
  const [totalIva, setTotalIva] = useState(0);

 /* useEffect(() => {
    console.log("Valor de useStarte productos en recepcion");
    console.log(productos);
  }, [productos]);*/

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
        <RecepcionEncabezado/>
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
