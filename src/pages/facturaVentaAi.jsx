import React, { useState, useContext, useEffect } from 'react';
import Modal from 'react-modal';
import ModalProducto from '../components/fs.facturaventa/modalProducto2';
import { Container, Grid } from '@mui/material';
import { PrimaryButton, H4Typography, BoxFlex, BoxM1, FullWidthGridItem, BoxMain } from 'src/constants/componentsPersonalite';
import DetalleProducto from 'src/components/fs.facturaventa/Detalle/detalleProducto';
import Cabecera from 'src/components/fs.facturaventa/cabecera';




export const ProductosContext = React.createContext([]);

const FacturaVentaAi = () => {
  const colums = ["Id", "Nombre", "Iva", "Categoria", "Precio", "Marca", "Cantidad", "Subtotal"];
  const [productos, setProductos] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [total, setTotal] = useState(0);

  const handleModal = () => {
    setModalIsOpen(!modalIsOpen)
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

  return (

    <BoxMain>
      <Container>
        <Cabecera />
        <Grid container>
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

          <FullWidthGridItem>
            <DetalleProducto
              searchResult={productos}
              handleCantChange={handleCantChange}
              keyProp="Id"
            ></DetalleProducto>
          </FullWidthGridItem>

          <FullWidthGridItem>
            <Modal isOpen={modalIsOpen}>
              <ProductosContext.Provider value={[productos, setProductos]}>
                <PrimaryButton onClick={() => handleModal()}>
                  Cerrar
                </PrimaryButton>
                <ModalProducto
                  onRequestClose={() => handleModal()}
                />
              </ProductosContext.Provider>
            </Modal>
          </FullWidthGridItem>

        </Grid>
      </Container>
    </BoxMain>
  );
};

export default FacturaVentaAi;
