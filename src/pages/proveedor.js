import * as React from 'react';
import Head from 'next/head';
import { Box, Container} from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import { useEffect, useState } from 'react';
import { ProveedorByDetalle } from 'src/utils/ApiUtil';
import { ProveedorLista } from 'src/components/proveedor/proveedor-lista';

export const Proveedor = ({idDet}) => {

  const [list, setList] = useState([]);
  const [active, setActive] = useState(true);

  useEffect(()=>{  
    //setIdDet(1);  
    findListProveedor(idDet);
  },[]);

  const toggle = () => { setActive(!active);}

  const findListProveedor = async (Detalle) => {
    let json = await ProveedorByDetalle(Detalle);
    //debugger
    setList(json);
  }

  return (<>
    <Head>
      <title>
        Lista Proveedor | Material Kit
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth={true}>
        <Box sx={{ mt: 3 }}>
          <ProveedorLista Proveedores={list} active={active} toggle={toggle} />
        </Box> 
      </Container>
    </Box>
  </>
  );
}

  
/*
//Products.getLayout = (page) => (
Proveedor.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Proveedor;
*/