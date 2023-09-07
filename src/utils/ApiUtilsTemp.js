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
  const url = await 'http://localhost:8080/ferreteria/CaracteristicaProductoAPI/fingByVar/' + term;
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

export const buscarClienteNombre = async (param) => {
  const url = 'http://localhost:8080/ferreteria/PersonaApi/persona/razon_social/' + param;
  try {
    const respuesta = await axios.get(url);
    const clientesSearch = respuesta.data;
    const clientes = clientesSearch.content.map((cliente) => ({
      id: cliente.personaId  || 0,
      nombre: cliente.personaNombreRazonSocial || "Sin Nombre",
      RucCi: personaRucOCi || "XX",
    }));
    return clientes[0];
  }catch(error){
    console.log("Error en la peticion "+ error);
  }
}

export const buscarClienteNombre2 = async (param) => {
  const url = 'http://localhost:8080/ferreteria/PersonaApi/persona/razon_social/' + param;
  try {
    const respuesta = await axios.get(url);
    const clientesSearch = respuesta.data;
    const cliente = {
      id: clientesSearch.personaId,
      nombre: clientesSearch.personaNombreRazonSocial,
      RucCi: clientesSearch.personaRucOCi,
    }
    return cliente;
  }catch(error){
    console.log("Error en la peticion "+ error);
  }
}

export const buscarClienteRuc = async (param ) => {
  const url = 'http://localhost:8080/ferreteria/PersonaApi/persona/' + param;
  try {
    const respuesta = await axios.get(url);
    const clientesSearch = respuesta.data;
    const cliente = {
      id: clientesSearch.personaId || 0,
      nombre: clientesSearch.personaNombreRazonSocial || "Sin Nombre",
      RucCi: clientesSearch.personaRucOCi || "XX",
    }
    return cliente;
  }catch(error){
    console.log("Error en la peticion "+ error);
  }
}

export const buscarClientes = async (term) => {
  const clientesNombre = await buscarClienteNombre(term);
  const clientesRuc = await buscarClienteRuc(term);
  const clientes = [];
  clientesNombre.forEach((cliente) => {
    if (!clientes.includes(cliente)) {
      clientes.push(cliente);
    }
  });
  clientesRuc.forEach((cliente) => {
    if (!clientes.includes(cliente)) {
      clientes.push(cliente);
    }
  });
  return clientes;
};
/*/** */
export const buscarClientes2 = async (term) => {
  const clientesNombre = await buscarClienteNombre(term);
  const clientesRuc = await buscarClienteRuc(term);
  // combinar los dos arrays
  const clientes = [...clientesNombre, ...clientesRuc];
  // eliminar los duplicados usando Set
  const clientesUnicos = [...new Set(clientes)];
  return clientesUnicos;
};
