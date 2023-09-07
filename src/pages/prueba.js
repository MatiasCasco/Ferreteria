import * as React from 'react';
import { Box, Container } from '@mui/material';
import { useEffect, useState } from 'react';
import CrudProducts from 'src/components/crud/crud-productos';


const Prueba = () => {


  return (
    <>
     
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth={false}>
          <Box sx={{ mt: 3 }}>
           <CrudProducts></CrudProducts>
          </Box>
        </Container>
      </Box>
    </>
  );
}


export default Prueba;
//<CrudProveedores list={list}></CrudProveedores>//
/* <Head>
        <title>
          Interfaz de Prueba | Material Kit
        </title>
      </Head>*/