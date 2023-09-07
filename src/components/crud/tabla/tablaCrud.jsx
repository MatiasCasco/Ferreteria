import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  TableFooter
} from "@mui/material";
import {
  Box,
  Card,
  CardContent, Container
} from '@mui/material';
import { ImageNotFound } from "src/constants/componentsPersonalite";
const TablaCrud = ({ data, columns, onDelete, onUpdate, keyProp }) => {

  TablaCrud.propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    onDelete: PropTypes.func,
    onUpdate: PropTypes.func,
    keyProp: PropTypes.string.isRequired,
  };


  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const showActionsColumn = onDelete || onUpdate;

  return (

    <Box sx={{ mt: 3 }}>
      <Card>
        <CardContent>
          <Table >
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column}>{column}</TableCell>
                ))}
                {showActionsColumn && <TableCell>Acciones</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody >
              {data.length !== 0 ? (
                data.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((row) => (
                  <TableRow key={row[keyProp]}>
                    {columns.map((column) => (
                      <TableCell key={`${row[keyProp]}-${column}`}>
                        <span>{row[column]}</span>
                      </TableCell>
                    ))}
                    <TableCell>
                      {onDelete ? (
                        <button onClick={() => onDelete(row[keyProp])}>Eliminar</button>
                      ) : null}
                      {onUpdate ? (
                        <button onClick={() => onUpdate(row)}>Actualizar</button>
                      ) : null}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length}
                    align="center">
                    <ImageNotFound />
                  </TableCell>
                </TableRow>
              )}</TableBody>


            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                  colSpan={3}
                  count={data.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </CardContent>
      </Card>
    </Box>
  );
};





export default TablaCrud;
// <img src="/static/images/not_found.png" alt="No hay datos" />