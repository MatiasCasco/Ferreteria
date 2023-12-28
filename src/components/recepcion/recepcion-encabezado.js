import * as React from 'react';
import { useState } from 'react';
import { Box, Button, Card, CardContent, Container, Grid } from '@mui/material';
import { FechaSelect, ListSelect } from '../../constants/customizable-components';
import * as msg from '../../constants/messages';
import { startOfToday } from 'date-fns';

export const RecepcionEncabezado = ({OpenModal}) => {
  const today = startOfToday();
  const [fechaFactura, setFechaFactura] = useState(today);
  const [fechaRecepcion, setFechaRecepcion] = useState(today);
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

// Modifica la función handleFechaFacturaChange para actualizar ambas fechas
  const handleFechaFacturaChange = (date) => {
    // Actualiza la fecha de la factura
    setFechaFactura(date);

    // Si la fecha de recepción es anterior a la fecha de la factura, ajústala
    if (fechaRecepcion < date) {
      setFechaRecepcion(date);
    }
  }

// Agrega lógica en la función handleFechaRecepcionChange para verificar la fecha
  const handleFechaRecepcionChange = (date) => {
    // Verifica que la fecha de recepción no sea anterior a la fecha de la factura
    if (date >= fechaFactura) {
      setFechaRecepcion(date);
    } else {
      // Puedes mostrar un mensaje de error o realizar alguna acción
      console.error('La fecha de recepción no puede ser anterior a la fecha de la factura.');
      alert("No se puede asignar a recepción un fecha menor a la fecha de emisión")
    }
  }

  return (<>
      <Grid container direction="column">
        <Grid item
        >
          <Grid
            container
            columns={20}
            direction="row"
            justifyContent="space-evenly"
            alignItems="flex-start"
            spacing={6}
          >
            <Grid item  md={10}  >
              <Card sx={{height: '10%', overflow: 'visible'}}>
                <CardContent>
                  <Box>
                    <FechaSelect title={msg.FECHA_FACTURA_COMPRA} selected={fechaFactura} onChange={handleFechaFacturaChange} message={msg.FECHA_SELECT} style={{ position: 'relative', zIndex: '300' }}/>
                    <FechaSelect title={msg.FECHA_RECEPCION_PRODUCTO} selected={fechaRecepcion} onChange={handleFechaRecepcionChange} message={msg.FECHA_SELECT} style={{ position: 'relative', zIndex: '200' }}/>
                    <Box sx={{ mt: 1.5}}/>
                    <ListSelect
                      title={"Proveedor"}
                      list={proveedores}
                      value={proveedor}
                      onChange={handleProveedorChange}
                      inputLabelStyle={{ color: 'black' }}
                      selectStyle={{ color: 'black', border: '2px solid black' }}
                    />
                    <Box sx={{ mt: 2}}/>
                    <ListSelect
                      title={"Condicion Factura"}
                      list={condiciones}
                      value={condicionFactura}
                      onChange={handleCondicionFacturaChange}
                      inputLabelStyle={{ color: 'black' }}
                      selectStyle={{ color: 'black', border: '2px solid black' }}/>
                  </Box>
                </CardContent>
              </Card>

            </Grid>
            <Grid item md={8}>
              <Card sx={{height: '10%', overflow: 'visible'}}>
                <CardContent>
                  <Box>
                    <h2>Datos Seleccionados:</h2>
                    <p>Proveedor: { proveedor }</p>
                    { proveedor && <p>RUC: { ruc }</p> }
                    <p>Condición de la Factura: { condicionFactura }</p>
                    { fechaFactura && (
                      <p>Fecha de la factura: { fechaFactura.toLocaleDateString() }</p>
                    ) }
                    { fechaRecepcion && (
                      <p>Fecha de Recepción de
                        Producto: { fechaRecepcion.toLocaleDateString() }</p>
                    ) }
                  </Box>
                </CardContent>
              </Card>
              <Box sx={{ mt: 2}}/>
              <Button
                color="primary"
                variant="contained"
                sx={{ mr: 1 , ml: 1 }}
                onClick={OpenModal}
              >
               Agregar Productos
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
  </>
  );
}
