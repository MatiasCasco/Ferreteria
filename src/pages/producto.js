import * as React from 'react';
import Head from 'next/head';
import { Box, Container,FormControl, InputLabel, MenuItem, Select, TextField, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import { useEffect, useState } from 'react';
import { FechaSelect, ListSelect, ViewRucSelect } from '../constants/customizable-components';
import * as msg from '../constants/messages';

const Producto = () => {
  const [fechaFactura, setFechaFactura] = useState(null);
  const [fechaRecepcion, setFechaRecepcion] = useState(null);
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

  const handleFechaFacturaChange = (date) => {
    setFechaFactura(date);
  }

  const handleFechaRecepcionChange = (date) => {
    setFechaRecepcion(date);
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
          <Container>
            <div>
              <FechaSelect selected={fechaFactura} onChange={handleFechaFacturaChange} message={msg.FECHA_FACTURA_COMPRA}/>
            </div>
          </Container>

          <Box sx={{ mt: 3}}/>
          <div>
            <ListSelect
              title={"Proveedor"}
              list={proveedores}
              value={proveedor}
              onChange={handleProveedorChange}
              inputLabelStyle={{ color: 'black' }}
              selectStyle={{ color: 'black', border: '2px solid black' }}
            />
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
            <Box sx={{ mt: 3}}/>
            <Box sx={{ mt: 3}}/>
            <div>
              <h2>Datos Seleccionados:</h2>
              <p>Proveedor: {proveedor}</p>
              {proveedor && <p>RUC: {ruc}</p>}
              <p>Condición de la Factura: {condicionFactura}</p>
              {fechaFactura && (
                <p>Fecha de la factura: {fechaFactura.toLocaleDateString()}</p>
              )}
              {fechaRecepcion && (
                <p>Fecha de Recepción de Producto: {fechaRecepcion.toLocaleDateString()}</p>
              )}
            </div>
          </div>
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
