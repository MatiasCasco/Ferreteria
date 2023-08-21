import axios from "axios";

export const getUsers = () => {
  return axios.get("https://api.example.com/users");
};

export const getProducts = async () => {
  const API_URL = "http://localhost:8080/ferreteria/ProductoAPI";
  const response = await Axios.get(`${API_URL}/all`);
  const products = response.data;
  const allProducts = products.content.map((product) => ({
    Id: product.productoId,
    Nombre: product.productoNombre,  
    Iva: product.productoIva,
    Medida: product.unidadMedidaBase.unidadMedida,
    Descripcion: product.categoria.categoriaDescripcion,
    Precio: product.productoPrecio + " gs." // Add this line
  }));
  return allProducts;
};




export const searchProduct = async (term) => {
  const url = await 'http://localhost:8080/ferreteria/CaracteristicaProductoAPI/fingByVar/'+term;
  try {
    const response = await axios.get(url);
    const products = response.data;
    const allProducts = products.content.map((product) => ({
      Id: product.id,
      Nombre: product.nombre,
      Iva: product.iva,
      Medida: product.medida,
      Marca: product.marca,
      Categoria: product.categoria,
      Precio: product.precio,
    }));
    return allProducts;
  } catch (error) {
    console.error(error);
  }
};
