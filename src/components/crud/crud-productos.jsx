import React, { useState, useEffect } from "react";
import Tablacrud from "./tabla/Tablacrud";
import BarraBusqueda from "./tabla/barraBusqueda";
import Axios from "axios";

const API_URL = "http://localhost:8080/ferreteria/ProductoAPI";

function CrudProducts() {
  const [products, setProducts] = useState([]);
  const [actions, setActions] = useState(["Edit", "Delete"]);
  const [attributes, setAttributes] = useState(["Name", "Brand", "Category"]);
  const [searchTerm, setSearchTerm] = useState("");

  const getProducts = async () => {
    const response = await Axios.get(`${API_URL}/all`);
    const products = response.data;
  
    // This will return an array of all of the products.
    const allProducts = [];
    for (const product of products.content) {
      // Add the keyAttribute to each product
      product.keyAttribute = product.id;
      allProducts.push(product);
    }
  
    setProducts(allProducts);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleDelete = async (idProduct) => {
    const response = await Axios.delete(
      `${API_URL}/deleteProducto/${idProduct}`
    );
    if (response.status === 200) {
      getProducts();
    }
  };

  const handleUpdate = async (product) => {
    const response = await Axios.put(
      `${API_URL}/updateProducto`,
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
        onDelete={handleDelete}
        onUpdate={handleUpdate}
        keyAttribute="keyAttribute"
      />
       <BarraBusqueda
        onSearch={onSearch}
        searchTerm={searchTerm}
      />
    </div>
  );
}

export default CrudProducts;
