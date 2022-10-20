import React from 'react'
import { Box, Container, Grid, Table, TextField, Typography } from '@mui/material';
import Buscador from 'src/components/facturaVenta/Buscador';

import { AllProductos} from 'src/utils/ApiUtil';
//import { Productos } from 'src/__mocks__/productos';
import { v4 as uuid } from 'uuid';
import { ProductoListToolbar } from '../components/product/producto-list-toolbar';
import { useEffect,useState } from 'react';
import Detalle from 'src/components/facturaVenta/Detalle';
import Cabecera from 'src/components/facturaVenta/Cabecera';

const facturaVenta =()=> {
  
   
    const [listaFiltrada, setListaFiltrada] = useState([]);
    const [listMarca, setListMarca] = useState([]);
    const [listCategoria, setListCategoria] = useState([]);
    const [productsList, setProductList]= useState([]);
    const [editing,setEditing]= useState(false);
    useEffect(()=>{
      findList();
    }, []);
   
    const findList = async () => {
      let json = await AllProductos();
      //debugger
      setProductList(json);
      getMarcasYCategorias(json);
      setListaFiltrada(json);
    }

    const filtrar = (producto, marca, categoria, stock, min) => {
      let resultadoBusquedad = [];
      let lista = [];
      if (!min){
        lista = productsList;
      }else{
        lista = productsList.filter((item) => {
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
  
    const getMarcasYCategorias = (productsList) => {
      let listAux1 = [" "], listAux2 = [" "];
      productsList.map((item) => {
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
    //agregar a detalle
    //Id	Nombre	Categoria	Precio	Cantidad	SubTotal
    
    const [detalles,setDetalles]=useState([]);
    const [total,setTotal]=useState(0);
    const [cont,setCont]=useState(0);
    const [empleado,setEmpleado]=useState(
      {
        id:1,
        nombre:"Juan",
        Apellido:"Perez"
      }
    )
    
    const addDetalle=(detalle)=>{
        setDetalles([
          ...detalles,
          detalle
        ]);
        
      console.log('los productos son');
      console.log(detalles);
      setEditing(false)
    }




    return (
    <div className="div">
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container>
          <Grid container>
              <Grid item xs={12}>
                  <Cabecera empleado={empleado}/>
              </Grid>
              <Grid item xs={12}>

                  <ProductoListToolbar setEditing={setEditing} listMarca={listMarca} listCategoria={listCategoria} handlePadre={handlePadre}  />
                  {editing?(<Buscador productos={listaFiltrada} addDetalle={addDetalle} total={total} setTotal={setTotal} setEditing={setEditing}/>):
                  (
                    <Grid item xs={12}/>
                  )}
                           
              </Grid>
              <Grid item xs={12}>
                  
              </Grid>
              <Grid item xs={4}>
                    <div><h1>Detalle</h1></div>
              </Grid>
              <Grid item xs={4}>
                    <div> </div>
              </Grid>
              <Grid item xs={4}>
                    <div><h3>Total: </h3>{total}</div>
              </Grid>
              <Grid item xs={12}>
                    <Detalle detalles={detalles}/>
              </Grid>

          </Grid>

        </Container>
        

      </Box>
    </div>
  )
}

export default facturaVenta