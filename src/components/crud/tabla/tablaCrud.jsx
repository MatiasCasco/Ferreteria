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

  const showActionsColumn = onDelete || onUpdate;

  return (
    <Table>
      <TableHead>
        <TableRow>
          {columns.map((column) => (
            <TableCell key={column}>{column}</TableCell>
          ))}
          {showActionsColumn && <TableCell>Acciones</TableCell>}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row) => (
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
        ))}
      </TableBody>
    </Table>
  );
};


TablaCrud.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  onDelete: PropTypes.func,
  onUpdate: PropTypes.func,
  keyProp: PropTypes.string.isRequired,
};

export default TablaCrud;