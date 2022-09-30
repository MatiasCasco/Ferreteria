import {  useEffect, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import FormControlLabel from '@mui/material/FormControlLabel';
import {
  Avatar,
  Switch,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Alert,
  Snackbar,
  Slide,
} from '@mui/material';
import { getInitials } from '../../utils/get-initials';

function TransitionDown(props){
  return <Slide {...props} direction="down" />;
}

export const ProveedorLista = (props) => {
  const [selectedProveedorIds, setSelectedProveedorIds] = useState([]);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [transition, setTransition] = useState(undefined);
  const { Proveedores, active, toggle, ...rest } = props;

  useEffect(() => {
    // 👇️ some condition here
    if (Proveedores[(page * limit)] === undefined) {
      setPage(0);
    }
    if(active){
      setTransition(() => TransitionDown);
    }
  });

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    toggle();
  };
  
  const handleSelectAll = (event) => {
    let newSelectedProveedorIds;

    if (event.target.checked) {
      newSelectedProveedorIds = Proveedores.map((Proveedor) => Proveedor.id);
    } else {
      newSelectedProveedorIds = [];
    }

    setSelectedProveedorIds(newSelectedProveedorIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedProveedorIds.indexOf(id);
    let newSelectedProveedorIds = [];

    if (selectedIndex === -1) {
      newSelectedProveedorIds = newSelectedProveedorIds.concat(selectedProveedorIds, id);
    } else if (selectedIndex === 0) {
      newSelectedProveedorIds = newSelectedProveedorIds.concat(selectedProveedorIds.slice(1));
    } else if (selectedIndex === selectedProveedorIds.length - 1) {
      newSelectedProveedorIds = newSelectedProveedorIds.concat(selectedProveedorIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedProveedorIds = newSelectedProveedorIds.concat(
        selectedProveedorIds.slice(0, selectedIndex),
        selectedProveedorIds.slice(selectedIndex + 1)
      );
    }
    if(newSelectedProveedorIds.length > 1){
      newSelectedProveedorIds.shift();
    }
    console.log(newSelectedProveedorIds);
    //
    debugger;
    setSelectedProveedorIds(newSelectedProveedorIds);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const emptyRows =
  page > 0 ? Math.max(0, (1 + page) * limit - Proveedores.length) : 0;

  return (

    <>
        <Alert onClose={handleClose} autoHideDuration={10000} variant="filled" severity="info" > Seleccione proveedor para el producto </Alert>
        <Alert onClose={handleClose} variant="filled" severity="warning" > Existe una opcion menos costosa</Alert>

      <Snackbar open={active} autoHideDuration={10000} onClose={handleClose} TransitionComponent={transition} key={transition ? transition.name : ''}>
        <Alert onClose={handleClose} variant="filled" severity="info" > Seleccione proveedor para el producto </Alert>
      </Snackbar>  
  
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <TableHead>
              <TableRow>
                <TableCell>
                  {"Check"}
                </TableCell>
                <TableCell>
                  Empresa
                </TableCell>
                <TableCell>
                  Ruc
                </TableCell>
                <TableCell>
                  Costo anterior
                </TableCell>
                <TableCell>
                  Ultima compra
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Proveedores.slice(page * limit, page *limit + limit).map((Proveedor) => (
                <TableRow
                  hover
                  key={Proveedor.id}
                  selected={selectedProveedorIds.indexOf(Proveedor.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedProveedorIds.indexOf(Proveedor.id) !== -1}
                      onChange={(event) => handleSelectOne(event, Proveedor.id)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    {Proveedor.empresa.nombre}
                  </TableCell>
                  <TableCell>
                    {Proveedor.empresa.empresaRuc}
                  </TableCell>
                  <TableCell>
                    {Proveedor.precioVenta}
                  </TableCell>
                  <TableCell>
                    {Proveedor.ultimaCompra}
                  </TableCell>
                </TableRow>              
              ))}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={Proveedores.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={
          page
        
        }
        rowsPerPage={limit}
        rowsPerPageOptions={[3, 5, 10, 25, 50, 100]}
      />

      
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Acercar"
      />

    </Card>
    </>
  );
};

ProveedorLista.propTypes = {
  Proveedores: PropTypes.array.isRequired
};
