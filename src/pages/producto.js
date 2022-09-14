import * as React from 'react';
import Head from 'next/head';
import { Box, Container, Grid, Pagination } from '@mui/material';
import { products } from '../__mocks__/products';
import { ProductoListToolbar } from '../components/product/producto-list-toolbar';
import { ProductoTarjeta } from '../components/product/producto-tarjeta';
import { DashboardLayout } from '../components/dashboard-layout';
import { useEffect, useState } from 'react';
import { AllProductos, BuscarEmpresa } from 'src/utils/ApiUtil';

const Producto = () => {

  const [list, setList] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const TOTAL_POR_PAGINA = 7;

  useEffect(()=>{
    findList();
  });

  const findList = async () => {
    let json = await AllProductos();
    //debugger
    setList(json);
  }
  
  const getTotalPaginas = () =>{
    //list -> aca requerimos el tamaño de la lista filtrado si es que se aplico algun filtro
    //Realza el calculo de cuantas paginas vamos a detener, en este ejemplo acada pagina tiene 7 productos 
    let cantidadTotalDeProductos = list.length;
    return Math.ceil(cantidadTotalDeProductos / TOTAL_POR_PAGINA,);
  }

  // Aca muestra los productps que lleva cada pagina
  //Ejemplo o al 6, 7 al 13, etc
  // Si se aplico un filtro aca debe estar el list filtrado
  //Observacion haces una  funcion anonima ()=>{....}
  // Haces que aplique primero el filtrado a list y mas abajo ponele lo del list.slice
  let productosPorPagina = list.slice(
    (paginaActual - 1) * TOTAL_POR_PAGINA,
    paginaActual * TOTAL_POR_PAGINA
  );

  return (<>
    <Head>
      <title>
        Productos | Material Kit
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
        <ProductoListToolbar />
        {productosPorPagina.map((product) => (
          <Grid
            item
            key={product.id}
          >
            <Box sx={{ pt: 6 }}></Box>
            <ProductoTarjeta product={product} />
          </Grid>
        ))}

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 3
          }}
        >
          <Pagination
            color="primary"
            count={getTotalPaginas()}
            page={paginaActual}
            onChange={(event, value) => {              
              setPaginaActual(value)
            }}
            size="small"
          />
        </Box>
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
