import React from 'react'
import { v4 as uuid } from 'uuid';
import {
  Avatar,
  Switch,
  Box,
  Button, 
  Card,
  Checkbox,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import {useForm} from 'react-hook-form';
import {  useEffect, useState } from 'react';



const Buscador =({productos,addDetalle,total,setTotal,setEditing, ...rest})=> {
  
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);
  useEffect(() => {
    if (productos[(page * limit)] === undefined) {
      setPage(0);
    }
  });
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  const onSubmit = ()=>{
    console.log(data)
  };

  const[cantidad,setCantidad]=useState(0);


  return (
    <div>
        <Card {...rest}>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" >
                  <TableHead>
                      <TableRow>
                          <TableCell>Id</TableCell>
                          <TableCell>Nombre</TableCell>
                          <TableCell>Categoria</TableCell>
                          <TableCell>Precio</TableCell>
                          <TableCell>Cantidad</TableCell>
                          <TableCell>Acciones</TableCell>
                      </TableRow>
                  </TableHead>
                  <TableBody>
                      {
                        productos.length>0?
                          productos?.map(product=>(
                            <TableRow hover key={product.id}>
                              <TableCell hidden={true}>{product.producto.id}</TableCell>
                              <TableCell>{product.producto.nombre}</TableCell>
                              <TableCell>{product.producto.categoriaNombre}</TableCell>
                              <TableCell>{product.productoPrecio}</TableCell>
                              <TableCell>
                                <TextField type="number"
                                placeholder={"Cantidad en: "+product.producto.medidaStock}
                                variant="outlined"
                                onChange={event=>setCantidad(event.target.value)}/> 
                              </TableCell>
                              <TableCell>
                              <Button
                              onClick={
                                async()=>{
                                  let prod={
                                    id:uuid(),//product.producto.id,
                                    nombre:product.producto.nombre,
                                    categoria:product.producto.categoriaNombre,
                                    Precio:Number(product.productoPrecio),
                                    Cantidad:cantidad,
                                    UMedida:product.producto.medidaStock,
                                    Subtotal:Number(product.productoPrecio)*cantidad
                                  }
                                  await addDetalle(prod)
                                  console.log('el subtotal es')
                                  console.log(Number(product.productoPrecio)*cantidad)
                                  setTotal(total+(Number(product.productoPrecio)*cantidad))
                                  console.log('el total es')
                                  console.log(total)
                                  setCantidad(0)
                                }}>Agregar</Button>
                              </TableCell>

                            </TableRow>
                          )
                          ):(
                            <TableRow>
                              <TableCell></TableCell>
                              <TableCell></TableCell>
                              <TableCell></TableCell><TableCell><h3>Sin Elementos</h3> </TableCell>
                              <TableCell></TableCell>
                              <TableCell></TableCell>
                            </TableRow>
                          )
                      }
                      
                  </TableBody>
                  
          </Table>
         
          <TablePagination
              component="div"
              count={productos.length}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleLimitChange}
              page={
                page
              }
              rowsPerPage={limit}
              rowsPerPageOptions={[3, 5, 10, 25, 50, 100]}
          />
        </Card>
        
    </div>
  );
}
export default Buscador;