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
  const [listaFiltrada, setListaFiltrada] = useState([]);
  const [listMarca, setListMarca] = useState([]);
  const [listCategoria, setListCategoria] = useState([]);

  useEffect(()=>{
    findList();
  }, []);

  const findList = async () => {
    let json = await AllProductos();
    //debugger
    setList(json);
    getMarcasYCategorias(json);
    setListaFiltrada(json);
  }

  const filtrar = (producto, marca, categoria, stock, min) => {
    let resultadoBusquedad = [];
    let lista = [];
    if (!min){
      lista = list;
    }else{
      lista = list.filter((item) => {
        if (item.productoStockActual <= item.productoStockMin) {
          return item;
        }
      });
    }
    if (producto === " " && marca === " " && categoria === " " && stock === 0) {
      resultadoBusquedad = lista;
    } else {
      setPaginaActual(1);

      resultadoBusquedad = lista.filter((item) => {
        if ((producto === " " ? " " :item.producto.nombre.toString().toLowerCase().includes(producto.toLowerCase())) && (marca === " " ? " " :item.marcaNombre.toString().toLowerCase().includes(marca.toLowerCase()))  && (categoria === " " ? " " :item.producto.categoriaNombre.toString().toLowerCase().includes(categoria.toLowerCase()))) {
          return item;
        }
      })
    }
    setListaFiltrada(resultadoBusquedad);
  }

  const handlePadre = (producto, marca, categoria, stock, min) => {
    console.log("handlePadre"); 
    console.log(producto);
    console.log(marca);
    console.log(categoria);
    console.log(stock);
    console.log(min);
    //console.log(producto.length);
    //setListaFiltrada(resultado);
    filtrar(producto, marca, categoria, stock, min);
  }
  
  const getTotalPaginas = () =>{ 
    let cantidadTotalDeProductos = listaFiltrada.length;
    return Math.ceil(cantidadTotalDeProductos / TOTAL_POR_PAGINA,);
  }

  let productosPorPagina = listaFiltrada.slice(
    (paginaActual - 1) * TOTAL_POR_PAGINA,
    paginaActual * TOTAL_POR_PAGINA
  );

  const getMarcasYCategorias = (list) => {
    let listAux1 = [" "], listAux2 = [" "];
    list.map((item) => {
      listAux1.push(item.marcaNombre);
      listAux2.push(item.producto.categoriaNombre);
    });
    const dataMarca = new Set(listAux1);
    const dataCategoria = new Set(listAux2);
    setListMarca([...dataMarca]);
    setListCategoria([...dataCategoria]);
    console.log(listMarca);
    console.log(listCategoria);
    //debugger;
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
        <ProductoListToolbar listMarca={listMarca} listCategoria={listCategoria} handlePadre={handlePadre} />
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
