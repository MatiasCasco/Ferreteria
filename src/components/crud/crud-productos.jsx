import React, { useState, useEffect } from "react";
import Tablacrud from "./tabla/Tablacrud";
import BarraBusqueda from "./tabla/barraBusqueda";
import Axios from "axios";

function CrudProducts() {
  const [products, setProducts] = useState([]);
  const [actions, setActions] = useState(["Edit", "Delete"]);
  const [attributes, setAttributes] = useState(["Name", "Brand", "Category"]);
  const [searchTerm, setSearchTerm] = useState("");

  const getProducts = async () => {
    const response = await Axios.get("http://localhost:8080/ferreteria/ProductoAPI/all");
    const products = response.data;
  
    // This will return an array of all of the products.
    const allProducts = [];
    for (const product of products.content) {
        allProducts.push(product);
    }
  
    setProducts(allProducts);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleDelete = async (idProduct) => {
    const response = await Axios.delete(
      `http://localhost:8080/ferreteria/ProdcutoAPI/deleteProducto/${idProduct}`
    );
    if (response.status === 200) {
      getProducts();
    }
  };



  const handleUpdate = async (product) => {
    const response = await Axios.put(
      `http://localhost:8080/ferreteria/ProductoAPI/updateProducto`,
      product
    );
    if (response.status === 200) {
      getProducts();
    }
  };

  const onSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  return (
    <div>
      <Tablacrud
        products={products}
        actions={actions}
        attributes={attributes}
        editColumn="Edit"
        deleteColumn="Delete"
        onDelete={async (idProduct) => {
          const response = await Axios.delete(
            `http://localhost:8080/ferreteria/ProdcutoAPI/deleteProducto/${idProduct}`
          );
          if (response.status === 200) {
            getProducts();
          }
        }}
        onUpdate={async (product) => {
          const response = await Axios.put(
            `http://localhost:8080/ferreteria/ProductoAPI/updateProducto`,
            product
          );
          if (response.status === 200) {
            getProducts();
          }
        }}
      />
       <BarraBusqueda
        products={products}
        onSearch={onSearch}
        searchTerm={searchTerm}
      />
    </div>
  );
}

export default CrudProducts;
