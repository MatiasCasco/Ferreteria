import * as React from 'react';
import Head from 'next/head';
import { Box, Container, Grid, Pagination } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import CrudProducts from 'src/components/crud/crud-productos';
import TablaDetalle from '../components/crud/tabla/tablaDetalle';
import { useEffect, useState } from 'react';
import Axios from 'axios';
const Producto = () => {

  const [proveedor, setProveedor] = useState("");
  const [ruc, setRuc] = useState("");
  const [condicionFactura, setCondicionFactura] = useState('contado');

  const [proveedores, setProveedores] = useState([
    {nombre: "Proveedor 1", ruc: "123456789-1"},
    {nombre: "Proveedor 2", ruc: "123123123-2"},
    {nombre: "Proveedor 3", ruc: "456456456-3"},
    {nombre: "Proveedor 4", ruc: "789789789-4"},
    {nombre: "Proveedor 5", ruc: "987654321-5"}
  ]);

  const handleProveedorChange = (e) => {
    const selectedProveedor = e.target.value;
    const proveedorInfo = proveedores.find((p) => p.nombre === selectedProveedor);

    setProveedor(selectedProveedor);
    setRuc(proveedorInfo ? proveedorInfo.ruc : '');
  }

  const handleCondicionFacturaChange = (e) => {
    setCondicionFactura(e.target.value);
  }


  /*const [products, setProducts] = useState([]);
  const [attributes, setAttributes] = useState([]);

  useEffect(() => {
    setAttributes(["Nro", "Descripcion", "Marca", "Cantidad Esperada", "Cantidad Recibida" , "Acciones"]);
    getProducts();
  }, []);

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
  };*/

  return (<>
      <Head>
        <title>
          Proceso Recepción 1 | Material Kit
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container>
          <div>
            <div>
              <label>Proveedor:</label>
              <select
                value={proveedor}
                onChange={handleProveedorChange}
              >
                <option value="">Selecciona un proveedor</option>
                {proveedores.map((proveedor, index) => (
                  <option key={index} value={proveedor.nombre}>
                    {proveedor.nombre}
                  </option>
                ))}
              </select>
            </div>
            {proveedor && (
              <div>
                <label>RUC:</label>
                <span>{ruc}</span>
              </div>
            )}
            <div>
              <label>Condición de la Factura:</label>
              <select
                value={condicionFactura}
                onChange={handleCondicionFacturaChange}
              >
                <option value="contado">Contado</option>
                <option value="credito">Crédito</option>
              </select>
            </div>
            <div>
              <h2>Datos Seleccionados:</h2>
              <p>Proveedor: {proveedor}</p>
              {proveedor && <p>RUC: {ruc}</p>}
              <p>Condición de la Factura: {condicionFactura}</p>
            </div>
          </div><git
{/*          <Box sx={{ mt: 3 }}>
            <div>
              <TablaDetalle
                data={products}
                columns={attributes}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
                keyProp="productoId"
              />
            </div>
          </Box>*/}
        </Container>
      </Box>
    </>
  );
}



//Products.getLayout = (page) => (
Producto.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Producto;
