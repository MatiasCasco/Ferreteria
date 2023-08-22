import React, { useState, useContext } from 'react';
import Modal from 'react-modal';
import ModalProducto from '../components/fs.facturaventa/modalProducto2';
import { Box, Container, Grid } from '@mui/material';
import { PrimaryButton, H4Typography, BoxFlex, BoxM1, FullWidthGridItem, BoxMain } from 'src/constants/componentsPersonalite';



export const ProductosContext = React.createContext([]);

const FacturaVentaAi = () => {
  const [productos, setProductos] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const handleAgregarProducto = (producto) => {
    setProductos([...productos, producto]);
    setModalIsOpen(false);
  };

  return (

    <BoxMain>
      <Grid container>
        <FullWidthGridItem>
          <Box>
            <BoxFlex>
              <H4Typography>
                Productos
              </H4Typography>
              <BoxM1>
                <PrimaryButton onClick={() => setModalIsOpen(true)}>
                  Agregar Producto
                </PrimaryButton>
              </BoxM1>
            </BoxFlex>
          </Box>
        </FullWidthGridItem>
        <FullWidthGridItem>
          <Modal isOpen={modalIsOpen}>
            <ProductosContext.Provider value={[productos, setProductos]}>
              <PrimaryButton onClick={() => setModalIsOpen(false)}>
                Cerrar
              </PrimaryButton>
              <ModalProducto
                onAgregarProducto={handleAgregarProducto}
                onRequestClose={() => setModalIsOpen(false)}
              />
            </ProductosContext.Provider>
          </Modal>
        </FullWidthGridItem>
      </Grid>
    </BoxMain>
  );
};

export default FacturaVentaAi;
/**
 *   <h2>Factura Venta Ai</h2>
      <button >Agregar Producto</button>
      <button >Cerrar</button>
      <BoxMain>
      <Grid container>
        <Box>
          <BoxFlex>
            <H4Typography>
              Productos
            </H4Typography>
            <BoxM1>
              <PrimaryButton onClick={() => setModalIsOpen(true)}>
                Agregar Producto
              </PrimaryButton>
            </BoxM1>
          </BoxFlex>
        </Box>
        <FullWidthGridItem>
          <Modal isOpen={modalIsOpen}>
            <ProductosContext.Provider value={[productos, setProductos]}>
              <PrimaryButton onClick={() => setModalIsOpen(false)}>
                Cerrar
              </PrimaryButton>
              <ModalProducto
                onAgregarProducto={handleAgregarProducto}
                onRequestClose={() => setModalIsOpen(false)}
              />
            </ProductosContext.Provider>

          </Modal>
        </FullWidthGridItem>
      </Grid>
    </BoxMain>
 */