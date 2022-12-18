import * as React from 'react';
import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import CrudProveedores from 'src/components/crud/crud-proveedores';
import { useEffect, useState } from 'react';
import { AllProductos } from 'src/utils/ApiUtil';

const Prueba = () => {

  const [list, setList] = useState([]);

  useEffect(()=>{
    findList();
  }, []);

  const findList = async () => {
    let json = await AllProductos;
    //debugger
    setList(json);
    //getMarcasYCategorias(json);
    //setListaFiltrada(json);
  }

  return (
    <>
      <Head>
        <title>
          Interfaz de Prueba | Material Kit
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth={false}>
          <Box sx={{ mt: 3 }}>
            <CrudProveedores list={list}></CrudProveedores>
          </Box>
        </Container>
      </Box>
    </>
  );
}

Prueba.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Prueba;
