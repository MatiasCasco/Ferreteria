import React, { useState, useContext } from 'react';
import Modal from 'react-modal';
import ModalProducto from '../components/fs.facturaventa/modalProducto2';
import { Box, Container } from '@mui/material';



export const ProductosContext = React.createContext([]);

const FacturaVentaAi = () => {
  const [productos, setProductos] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const handleAgregarProducto = (producto) => {
    setProductos([...productos, producto]);
    setModalIsOpen(false);
  };

  return (
    <div>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <h2>Factura Venta</h2>
        <button onClick={() => setModalIsOpen(true)}>Agregar Producto</button>
        <Modal isOpen={modalIsOpen}>
          <ProductosContext.Provider value={[productos, setProductos]}>
            <ModalProducto
              onAgregarProducto={handleAgregarProducto}
              onRequestClose={() => setModalIsOpen(false)}
            />
          </ProductosContext.Provider>
          <button onClick={() => setModalIsOpen(false)}>Cerrar</button>
        </Modal>
      </Box>
    </div>
  );
};

export default FacturaVentaAi;
