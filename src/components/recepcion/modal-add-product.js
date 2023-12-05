import React, { useState, useContext, useEffect } from 'react';
import RegistrarProducto from '../register/registrar-producto';

const ModalAddProduct = ({onRequestClose}) => {

  return (
    <div>
      <RegistrarProducto handleClick={onRequestClose}/>
    </div>
  );
}

export default ModalAddProduct;
