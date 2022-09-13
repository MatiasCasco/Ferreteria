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
  
  useEffect(()=>{
    findList();

  });

  const findList = async () => {
    let json = await AllProductos();
    //debugger
    setList(json);
  }
  
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
        {list.map((product) => (
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
            count={3}
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
