import React from 'react'
import {
  Button, 
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';

import {  useEffect, useState } from 'react';
//const de tabla

const Detalle=({detalles})=> {
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
  };
  let count=1;
  return (
    <div>
        <Card >
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" >
                  <TableHead>
                      <TableRow>
                          <TableCell>Id</TableCell>
                          <TableCell>Nombre</TableCell>
                          <TableCell>Categoria</TableCell>
                          <TableCell>Precio</TableCell>
                          <TableCell>Cantidad</TableCell>
                          <TableCell>Subtotal</TableCell>
                          <TableCell>Acciones</TableCell>
                          <TableCell></TableCell>
                      </TableRow>
                  </TableHead>
                  <TableBody>
                      {
                        detalles.length>0?
                          detalles?.map(elemento=>(
                            <TableRow hover key={elemento.id}>
                              <TableCell>{count++}</TableCell>
                              <TableCell>{elemento.nombre}</TableCell>
                              <TableCell>{elemento.categoria}</TableCell>
                              <TableCell>{elemento.Precio}</TableCell>
                              <TableCell>{elemento.Cantidad+" "+elemento.UMedida}</TableCell>
                              <TableCell>{elemento.Subtotal}</TableCell>
                              <TableCell>
                              <Button>Editar</Button>
                              </TableCell>
                              <TableCell>
                              <Button>Eliminar</Button>
                              </TableCell>

                            </TableRow>
                          )
                          ):(
                            <TableRow>
                              <TableCell></TableCell>
                              <TableCell></TableCell>
                              <TableCell></TableCell>
                              <TableCell></TableCell><TableCell><h3>Sin Elementos</h3> </TableCell>
                              <TableCell></TableCell>
                              <TableCell></TableCell>
                              <TableCell></TableCell>
                            </TableRow>
                          )
                      }
                      
                  </TableBody>
                  
          </Table>
         
          <TablePagination
              component="div"
              count={detalles.length}
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
  )
}

export default Detalle