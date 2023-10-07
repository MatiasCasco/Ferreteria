import * as React from 'react';
import Head from 'next/head';
import { Box, Container, Grid, Card, CardContent } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import { useEffect, useState } from 'react';
import { FechaSelect, ListSelect, ViewRucSelect } from '../constants/customizable-components';
import * as msg from '../constants/messages';
import { CustomerListToolbar } from '../components/customer/customer-list-toolbar';
import { RecepcionEncabezado } from '../components/recepcion/recepcion-encabezado';

const Recepcion = () => {


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
          py: 2
        }}
      >
        <RecepcionEncabezado/>

      </Box>
    </>
  );
}

Recepcion.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);
export default Recepcion;
