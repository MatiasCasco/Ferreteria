import React, { useState } from "react";
import PropTypes from "prop-types";
import UpdateIcon from '@mui/icons-material/Update';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer, Paper
} from "@mui/material";
import {
  Box,
  Card,
  CardContent, Container
} from '@mui/material';
import { ImageNotFound } from "src/constants/componentsPersonalite";

const TablaDetalle = ({ data, columns, onDelete, onUpdate, keyProp }) => {

  TablaDetalle.propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    onDelete: PropTypes.func,
    onUpdate: PropTypes.func,
    keyProp: PropTypes.string.isRequired,
  };



  const showActionsColumn = onDelete || onUpdate;

  return (

    <Box sx={{ mt: 3 }}>
      <Card>
        <CardContent  sx={{ width: '100%', overflow: 'hidden' }}> 
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
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
                    data.map((row) => (
                      <TableRow key={row[keyProp]}>
                        {columns.map((column) => (
                          <TableCell key={`${row[keyProp]}-${column}`}
                          >
                            <span>{row[column]}</span>
                          </TableCell>
                        ))}
                        <TableCell>
                          {onDelete ? (
                            <IconButton aria-label="delete"
                            color="primary"
                              onClick={() => onDelete(row[keyProp])}>
                              <DeleteIcon />
                            </IconButton>

                          ) : null}
                          {onUpdate ? (
                            <IconButton aria-label="editar"
                            color="primary"
                              onClick={() => onUpdate(row)}
                            >
                              <UpdateIcon />
                            </IconButton>
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
                  )}
                </TableBody>
              </Table>
            </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
};





export default TablaDetalle;
// <img src="/static/images/not_found.png" alt="No hay datos" />