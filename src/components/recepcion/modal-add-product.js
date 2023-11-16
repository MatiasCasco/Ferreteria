import React, { useState, useContext, useEffect } from 'react';
import CrudProductsContainer from '../crud/crud-productos';
import RegistrarProducto from '../register/registrar-producto';

const ModalAddProduct = ({onRequestClose}) => {

  return (
    <div>
      {/*<CrudProductsContainer/>*/}
      <RegistrarProducto/>
    </div>
  );
}

export default ModalAddProduct;
