import Head from 'next/head';
import { Box, Container} from '@mui/material';
import { useEffect, useState, useRef } from 'react';
import { ProveedorLista } from 'src/components/proveedor/proveedor-lista';
import * as ApiUtils from '../utils/api-utils';
import * as ApiUrl from '../constants/apiUrls';

export const Proveedor = ({idDet, borradorPedido}) => {

  const [list, setList] = useState([]);
  const [active, setActive] = useState(true);
  const proveedor = useRef([]);

  useEffect(()=>{
    //setIdDet(1);
    findListProveedor(idDet);
  },[]);

  const toggle = () => { setActive(!active);}

  const findListProveedor = async (idDetalle) => {
    let endpoint = ApiUtils.buildURLWithParams(ApiUrl.ORIGEN_PRODUCTO_BY_DETALLE_PRODUCTO, {idDetalle})
    let url = ApiUtils.buildURL(ApiUrl.BASE_URL, endpoint);
    const json = await ApiUtils.getMCS(url);
    setList(json.content);
  }
  const updateProveedor = (Arreglo) => {
    proveedor.current = Arreglo;
  }
  const handlePadreProveedor = (Arreglo) => {
    updateProveedor(Arreglo);
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
