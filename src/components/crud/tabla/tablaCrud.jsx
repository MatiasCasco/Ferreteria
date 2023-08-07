import React from "react";
import PropTypes from "prop-types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";

const TablaCrud = ({ data, columns, onDelete, onUpdate, keyProp }) => {

  console.log(data);
  return (
    <Table>
      <TableHead>
        <TableRow>
          {columns.map((column) => (
            <TableCell key={column}>{column}</TableCell>
          ))}
          <TableCell>Acciones</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row) => (
          // Agregar la prop key al TableRow
          <TableRow key={row[keyProp]}>
            {columns.map((column) => (
// Agregar la prop key al TableCell
// La prop key es importante para el rendimiento y la precisión de esta celda.
// Sin ella, React tendría que volver a renderizar toda la tabla cada vez que se realice un cambio en esta celda.
// Esto podría ser muy lento para tablas grandes.
// Al usar la prop key, React solo tiene que volver a renderizar esta celda.
// Esto puede mejorar significativamente el rendimiento de las tablas grandes.
              <TableCell key={`${row[keyProp]}-${column}`}>
                <span>{row[column]}</span>
              </TableCell>
            ))}
            <TableCell>
              <button onClick={() => onDelete(row[keyProp])}>Eliminar</button>
              <button onClick={() => onUpdate(row)}>Actualizar</button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};


TablaCrud.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  keyProp: PropTypes.string.isRequired,
};

export default TablaCrud;
