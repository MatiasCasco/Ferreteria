import React, { useState } from 'react';
import Modal from 'react-modal';
import ModalProducto from './ModalProducto';

const FacturaVenta = () => {
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
        <ModalProducto onAgregarProducto={handleAgregarProducto} />
        <button onClick={() => setModalIsOpen(false)}>Cerrar</button>
      </Modal>
      {/* Aquí puedes agregar el componente TablaProductos para mostrar la lista de productos */}
    </div>
  );
};

export default FacturaVenta;
