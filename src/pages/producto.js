import * as React from 'react';
import Head from 'next/head';
import { Box, Container,FormControl, InputLabel, MenuItem, Select, TextField, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import { useEffect, useState } from 'react';

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
            <FormControl fullWidth>
              <InputLabel style={{ color: 'black' }}>Proveedor</InputLabel>
              <Box sx={{ mt: 2}}/>
              <Select
                value={proveedor}
                onChange={handleProveedorChange}
                style={{
                  color: 'black',
                  border: '1px solid black',
                }}
              >
                <MenuItem value="">Selecciona un proveedor</MenuItem>
                {proveedores.map((proveedor, index) => (
                  <MenuItem key={index} value={proveedor.nombre}>
                    {proveedor.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box sx={{ mt: 3}}/>
            {proveedor && (
              <div>
                <InputLabel style={{ color: 'black' }}>Ruc</InputLabel>
                <TextField
                  value={ruc}
                  disabled
                  fullWidth
                />
              </div>
            )}
            <Box sx={{ mt: 3}}/>
            <FormControl fullWidth>
              <InputLabel style={{ color: 'black' }}>Condición</InputLabel>
              <Select
                value={condicionFactura}
                onChange={handleCondicionFacturaChange}
              >
                <MenuItem value="">Seleccione condicion factura</MenuItem>
                <MenuItem value="Contado">Contado</MenuItem>
                <MenuItem value="credito">Crédito</MenuItem>
              </Select>
            </FormControl>
            <Box sx={{ mt: 3}}/>
            <Box sx={{ mt: 3}}/>
            <div>
              <h2>Datos Seleccionados:</h2>
              <p>Proveedor: {proveedor}</p>
              {proveedor && <p>RUC: {ruc}</p>}
              <p>Condición de la Factura: {condicionFactura}</p>
            </div>
          </div>
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
