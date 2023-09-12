import * as React from 'react';
import Head from 'next/head';
import { Box, Container,FormControl, InputLabel, MenuItem, Select, TextField, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import { useEffect, useState } from 'react';
import { ListSelect, ViewRucSelect } from '../constants/CustomizableComponents';

const Producto = () => {

  const [proveedor, setProveedor] = useState("");
  const [ruc, setRuc] = useState("");
  const [condicionFactura, setCondicionFactura] = useState("Contado");

  const [proveedores, setProveedores] = useState([
    {descripcion: "Proveedor 1", ruc: "123456789-1"},
    {descripcion: "Proveedor 2", ruc: "123123123-2"},
    {descripcion: "Proveedor 3", ruc: "456456456-3"},
    {descripcion: "Proveedor 4", ruc: "789789789-4"},
    {descripcion: "Proveedor 5", ruc: "987654321-5"}
  ]);
  const [condiciones, setCondiciones] = useState([
    {descripcion: "Contado"},
    {descripcion: "Credito"}
  ]);

  const handleProveedorChange = (e) => {
    const selectedProveedor = e.target.value;
    const proveedorInfo = proveedores.find((p) => p.descripcion === selectedProveedor);

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
            <ListSelect
              title={"Proveedor"}
              list={proveedores}
              value={proveedor}
              onChange={handleProveedorChange}
              inputLabelStyle={{ color: 'black' }}
              selectStyle={{ color: 'black', border: '2px solid black' }}/>
            <Box sx={{ mt: 3}}/>
            {proveedor && (
              <ViewRucSelect
                title={"RUC"}
                ruc={ruc}
                inputLabelStyle={{ color: 'black' }}
                selectStyle={{ color: 'black', border: '2px solid black' }}
              />
            )}
            <Box sx={{ mt: 3}}/>
            <ListSelect
              title={"Condicion Factura"}
              list={condiciones}
              value={condicionFactura}
              onChange={handleCondicionFacturaChange}
              inputLabelStyle={{ color: 'black' }}
              selectStyle={{ color: 'black', border: '2px solid black' }}/>
{/*            <FormControl fullWidth>
              <InputLabel style={{ color: 'black' }}>Condición</InputLabel>
              <Select
                value={condicionFactura}
                onChange={handleCondicionFacturaChange}
              >
                <MenuItem value="">Seleccione condicion factura</MenuItem>
                <MenuItem value="Contado">Contado</MenuItem>
                <MenuItem value="credito">Crédito</MenuItem>
              </Select>
            </FormControl>*/}
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
