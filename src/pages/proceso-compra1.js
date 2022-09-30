import * as React from 'react';
import Head from 'next/head';
import { Box, Container, Grid, Pagination } from '@mui/material';
import { products } from '../__mocks__/products';
import { ProductoListToolbar } from '../components/product/producto-list-toolbar';
import { ProductoTarjeta } from '../components/product/producto-tarjeta';
import { DashboardLayout } from '../components/dashboard-layout';
import { useEffect, useState } from 'react';
import { AllProductos, BuscarEmpresa } from 'src/utils/ApiUtil';
import { ProductoListResults } from 'src/components/product/producto-list-results';
import { ProductoLista } from 'src/components/product/producto-lista';

const ProcesoCompra1 = () => {

  const [list, setList] = useState([]);
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
        Proceso Compra 1 | Material Kit
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container>
        <ProductoListToolbar listMarca={listMarca} listCategoria={listCategoria} handlePadre={handlePadre} />
        <Box sx={{ mt: 3 }}>
          <ProductoLista productos={listaFiltrada} />
        </Box>
      </Container>
    </Box>
  </>
  );
}

  

//Products.getLayout = (page) => (
ProcesoCompra1.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default ProcesoCompra1;
