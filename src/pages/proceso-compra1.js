import * as React from 'react';
import Head from 'next/head';
import { Box, Container, Grid, Pagination } from '@mui/material';
import { ProductoListToolbar } from '../components/product/producto-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { useEffect, useState } from 'react';
import { ProductoLista } from 'src/components/product/producto-lista';
import * as ApiUtils from '../utils/api-utils';
import * as ApiUrl from '../constants/apiUrls';

const ProcesoCompra1 = () => {

  const [list, setList] = useState([]);
  const [listaFiltrada, setListaFiltrada] = useState([]);
  const [listMarca, setListMarca] = useState([]);
  const [listCategoria, setListCategoria] = useState([]);
  const [borradorPedido, setBorradorPedido] = useState([]);

  useEffect(()=>{
    findList();
  }, []);

  const findList = async () => {
    let url = ApiUtils.buildURL(ApiUrl.BASE_URL, ApiUrl.CARACTERISTICA_PRODUCTO_ALL);
    const json = await ApiUtils.getMCS(url);
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
    filtrar(producto, marca, categoria, stock, min);
  }

  const agregarBorrador = (idDetalleProducto, Proveedor) => {
    let newList = borradorPedido;
    let element = list.find(item => item.caracteristicasProductoId === idDetalleProducto);
    let myObj = {
      posicion: list.findIndex(item => item.caracteristicasProductoId === idDetalleProducto),
      idDetP: idDetalleProducto,
      descripcion: element.producto.productoNombre + " " + element.marca.marcaDescripcion,
      idProveedor:  Proveedor.id,
      nombreProveedor: Proveedor.nombre,
      rucProveedor: Proveedor.ruc
    };

    if (newList.length ===  0) {
      newList.push(myObj);
    } else {
      let index = newList.findIndex(item => item.idDetP === idDetalleProducto);
      if(index === -1){
        newList.push(myObj);
      } else {
        newList[index] = myObj;
      }
    }
    console.log("newList");
    console.log(newList);
    setBorradorPedido(newList);
  }

  const quitarBorrador = (idDetalleProducto) => {
    let borrador = borradorPedido;
    borrador = borrador.filter((item) => item.idDetP !== idDetalleProducto);
    setBorradorPedido(borrador);
  }

  const getMarcasYCategorias = (list) => {
    let listAux1 = [" "], listAux2 = [" "];
    list.map((item) => {
      listAux1.push(item.marca.marcaDescripcion);
      listAux2.push(item.producto.categoria.categoriaDescripcion);
    });
    const dataMarca = new Set(listAux1);
    const dataCategoria = new Set(listAux2);
    setListMarca([...dataMarca]);
    setListCategoria([...dataCategoria]);
    console.log(listMarca);
    console.log(listCategoria);
  }
  const handleSaveBorrador = (borradorPedido) => {
    sessionStorage.setItem('borradorPedido', JSON.stringify(borradorPedido));
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
        <ProductoListToolbar listMarca={listMarca} listCategoria={listCategoria} borradorPedido={borradorPedido} handlePadre={handlePadre} handleSaveBorrador={handleSaveBorrador} />
        <Box sx={{ mt: 3 }}>
          <ProductoLista productos={listaFiltrada} borradorPedido={borradorPedido} agregarBorrador={agregarBorrador} quitarBorrador={quitarBorrador} />
        </Box>
      </Container>
    </Box>
  </>
  );
}


ProcesoCompra1.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default ProcesoCompra1;
