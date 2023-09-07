import React, { useState, useEffect } from "react";
import Axios from "axios";
import BarraBusqueda from "./tabla/barraBusqueda";
import TablaDetalle from "./tabla/tablaDetalle";

const API_URL = "http://localhost:8080/ferreteria/ProductoAPI";

function CrudProductsContainer() {
  const [products, setProducts] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const getProducts = async () => {
    const response = await Axios.get(`${API_URL}/all`);
    const productos = response.data;
    const allProducts = productos.content.map((product) => ({
      Id: product.productoId,
      Nombre: product.productoNombre,
      Iva: product.productoIva,
      Medida: product.unidadMedidaBase.unidadMedida,
      Descripcion: product.categoria.categoriaDescripcion,
      Precio: product.productoPrecio +" gs." // Add this line
    }));
    
    
    setProducts([
      ...allProducts,
      ...allProducts,
      ...allProducts,
      ...allProducts,
      ...allProducts,
    ]);
  };

  useEffect(() => {
    setAttributes(["Id", "Nombre", "Iva", "Medida", "Descripcion","Precio"]);
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

  /**
   * a TablaDetalle le pasas:
   * data: los datos para tu tabla,
   * columns, seria los nombre de los datos de tu cabecera ejemplo ['id','nombre',]
   * las funciones onUpdate,onDelete,
   * keyprop el nombre del id de los datos en este caso el mio era 'productoId
   */

  return (
    <div>
      <TablaDetalle
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
