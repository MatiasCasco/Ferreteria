import React, { useState, useContext } from 'react';
import Modal from 'react-modal';
import ModalProducto from '../components/fs.facturaventa/modalProducto';
import CrudProductsContainer from 'src/components/crud/crud-productos';


// Aquí creas el objeto de contexto con un valor inicial
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
      <h2>Factura Venta</h2>
      <button onClick={() => setModalIsOpen(true)}>Agregar Producto</button>
      <Modal isOpen={modalIsOpen}>
        <ProductosContext.Provider value={[productos, setProductos]}>
          <ModalProducto onAgregarProducto={handleAgregarProducto}
           onRequestClose={() => setModalIsOpen(false)}
            />
        </ProductosContext.Provider>
        <button onClick={() => setModalIsOpen(false)}>Cerrar</button>
      </Modal>
      
    </div>
  );
};

export default FacturaVentaAi;
