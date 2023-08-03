//import * as React from 'react';
import Head from 'next/head';
import { Box, Container} from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import { useEffect, useState, useRef } from 'react';
import { ProveedorByDetalle } from 'src/utils/ApiUtil';
import { ProveedorLista } from 'src/components/proveedor/proveedor-lista';
import * as ApiUtils from '../utils/api-utils';
import * as ApiUrl from '../constants/apiUrls';
import { ORIGEN_PRODUCTO_BY_DETALLE_PRODUCTO } from '../constants/apiUrls';

export const Proveedor = ({idDet, borradorPedido}) => {

  const [list, setList] = useState([]);
  const [active, setActive] = useState(true);
  //const [proveedor, setProveedor] = useState([{ id: 0, nombre: " ", ruc: " " }]);
  const proveedor = useRef([]);

  useEffect(()=>{
    //setIdDet(1);
    findListProveedor(idDet);
  },[]);

  const toggle = () => { setActive(!active);}

  const findListProveedor = async (idDetalle) => {
    // let json = await ProveedorByDetalle(Detalle);
    let endpoint = ApiUtils.buildURLWithParams(ApiUrl.ORIGEN_PRODUCTO_BY_DETALLE_PRODUCTO, {idDetalle})
    let url = ApiUtils.buildURL(ApiUrl.BASE_URL, endpoint);
    const json = await ApiUtils.getMCS(url);
    debugger
    setList(json.content);
  }
  const updateProveedor = (Arreglo) => {
    /*console.log("Arreglo en proveedor");
    console.log(Arreglo);*/
    //setProveedor(Arreglo);
    proveedor.current = Arreglo;
  }
  const handlePadreProveedor = (Arreglo) => {
    updateProveedor(Arreglo);
    /*
    console.log("este es sel useStateProveedor");
    //console.log(proveedor);
    console.log(proveedor);
    console.log(proveedor.current);*/
    sessionStorage.setItem('ProveedorSelected', JSON.stringify(proveedor.current));
  }

  return (
    <>
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
            <ProveedorLista Proveedores={list} active={active} toggle={toggle} handlePadreProveedor={handlePadreProveedor} borradorPedido={borradorPedido} idDet={idDet} />
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
