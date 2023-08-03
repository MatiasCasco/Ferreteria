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
import * as ApiUrl from '../constants/apiUrls';
import * as ApiUtils from '../utils/api-utils';
import { CARACTERISTICA_PRODUCTO_ALL } from '../constants/apiUrls';

const Productos = () => {

  const [list, setList] = useState([]);
  const [listaFiltrada, setListaFiltrada] = useState([]);
  const [listMarca, setListMarca] = useState([]);
  const [listCategoria, setListCategoria] = useState([]);

  useEffect(()=>{
    findList();
  }, []);

  const findList = async () => {
    let url = ApiUtils.buildURL(ApiUrl.BASE_URL, ApiUrl.CARACTERISTICA_PRODUCTO_ALL);
    const json = await ApiUtils.getMCS(url);
    //debugger
    console.log(json.content);
    setList(json.content);
    getMarcasYCategorias(json.content);
    setListaFiltrada(json.content);
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

        if ((producto === " " ? " " :item.producto.productoNombre.toString().toLowerCase().includes(producto.toLowerCase()))
          && (marca === " " ? " " :item.marca.marcaDescripcion.toString().toLowerCase().includes(marca.toLowerCase()))
          && (categoria === " " ? " " :item.producto.categoria.categoriaDescripcion.toString().toLowerCase().includes(categoria.toLowerCase()))) {
          return item;
        }
        //debugger;
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
    list.forEach((item) => {
      //debugger
      const marca = item.marca;
      const categoria = item.producto.categoria;
      console.log(marca.marcaDescripcion);
      console.log(categoria.categoriaDescripcion);
      listAux1.push(marca.marcaDescripcion);
      listAux2.push(categoria.categoriaDescripcion);
    });
    const dataMarca = new Set(listAux1);
    const dataCategoria = new Set(listAux2);
    setListMarca([...dataMarca]);
    setListCategoria([...dataCategoria]);
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
        <Box sx={{ mt: 3 }}>
          <ProductoListResults productos={listaFiltrada} />
        </Box>
      </Container>
    </Box>
  </>
  );
}



//Products.getLayout = (page) => (
Productos.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Productos;
