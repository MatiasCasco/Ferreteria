import React, { useState, useEffect } from "react";
import Axios from "axios";

import TablaCrud from "./tabla/tablaCrud";
import BarraBusqueda from "./tabla/barraBusqueda";

const API_URL = "http://localhost:8080/ferreteria/ProductoAPI";

function CrudProductsContainer() {
  const [products, setProducts] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const getProducts = async () => {
    const response = await Axios.get(`${API_URL}/all`);
    const products = response.data;
    const allProducts = products.content.map((product) => ({
      Id: product.productoId,
      Nombre: product.productoNombre,
      Iva: product.productoIva,
      Medida: product.unidadMedidaBase.unidadMedida,
      Descripcion: product.categoria.categoriaDescripcion,
      Precio: product.productoPrecio +" gs." // Add this line
    }));
    
    setProducts(allProducts);
    setAttributes(["Id", "Nombre", "Iva", "Medida", "Descripcion","Precio"]);

  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleDelete = async (idProduct) => {
    const response = await Axios.delete(`${API_URL}/deleteProducto/${idProduct}`);
    if (response.status === 200) {
      getProducts();
    }
  };

  const handleUpdate = async (product) => {
    const response = await Axios.put(`${API_URL}/updateProducto`, product);
    if (response.status === 200) {
      getProducts();
    }
  };

  const onSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  return (
    <div>
      <TablaCrud
        data={products}
        columns={attributes}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
        keyProp="productoId"
      />
      <BarraBusqueda onSearch={onSearch}
       searchTerm={searchTerm} />
    </div>
  );
}

export default CrudProductsContainer;
