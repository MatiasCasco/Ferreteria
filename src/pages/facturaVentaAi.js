import React, { useState, useContext } from 'react';
import Modal from 'react-modal';
import ModalProducto from '../components/fs.facturaventa/modalProducto2';
import { Box, Container, Grid } from '@mui/material';
import { PrimaryButton, H4Typography, BoxFlex, BoxM1, FullWidthGridItem, BoxMain } from 'src/constants/componentsPersonalite';
import TablaCrud from 'src/components/crud/tabla/tablaCrud';



export const ProductosContext = React.createContext([]);

const FacturaVentaAi = () => {
  const colums= ["Id", "Nombre", "Iva", "Categoria","Precio","Marca","Cantidad","Subtotal"];
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
          <TablaCrud
            data={productos}
            columns={colums}
            keyProp="Id"
          ></TablaCrud>
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
