import * as React from 'react';
import Head from 'next/head';
import { Box, Container, Grid, Pagination } from '@mui/material';
import { products } from '../__mocks__/products';
import { ProductoListToolbar } from '../components/product/producto-list-toolbar';
import { ProductoTarjeta } from '../components/product/producto-tarjeta';
import { DashboardLayout } from '../components/dashboard-layout';
import { useEffect, useState } from 'react';
import { AllProductos, BuscarEmpresa } from 'src/utils/ApiUtil';
import { CrudTable } from 'src/components/crud/crud-table';

export const CrudInterface = () => {
  return (<>
    <Head>
      <title>
        Interdaz de Cruds | Material Kit
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
     <CrudTable/>   
    </Box>   
    </>
  );
}

  

//Products.getLayout = (page) => (
CrudInterface.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default CrudInterface;
