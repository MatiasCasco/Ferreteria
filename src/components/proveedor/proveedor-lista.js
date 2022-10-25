import {  useEffect, useReducer, useRef, useState } from 'react';
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
import { Proveedor } from 'src/pages/proveedor';
import { ContactSupport } from '@mui/icons-material';

function TransitionDown(props){
  return <Slide {...props} direction="down" />;
}

export const ProveedorLista = (props) => {
  const [selectedProveedorIds, setSelectedProveedorIds] = useState([]);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [transition, setTransition] = useState(undefined);
  const { Proveedores, active, toggle, handlePadreProveedor, borradorPedido, idDet, ...rest } = props;
  const [checkedState, setCheckedState] = useState([]);
  const valor = useRef(false);

  useEffect(() => {
    // 👇️ some condition here
    if (Proveedores[(page * limit)] === undefined) {
      setPage(0);
    }
    if(active){
      setTransition(() => TransitionDown);
    }
    if (valor.current === false && Proveedores.length > 0) {
      if(checkedState.length === 0) {
        cargarLista();
        valor.current = true;
      }
    }
  });

  const cargarLista = () => {
    let count = 0;
    let lista = Proveedores.slice().fill(false);
    console.log("borrador pedido")
    console.log(borradorPedido)
    if (borradorPedido.length > 0){
      Proveedores.map((item, index) => {
        if (borradorPedido.findIndex(element => element.idDetP === idDet && element.nombreProveedor === item.empresa.nombre) !== -1) {
          console.log(index);
          lista[index] = !lista[index];
        }
      })
    }
    setCheckedState(lista);
    console.log("Lista");
    console.log(lista);
  }
  const handleHijoProveedor = (ProveedorObj) => {
    handlePadreProveedor(ProveedorObj);
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    toggle();
  };
  
  const handleSelectOne = (event, id) => {
    let index = findIndex(id);
    handleOnChangeCheck(index);
 
    console.log("ver si funciona");
    console.log(checkedState);
 
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
    //console.log(id);
    //console.log(newSelectedProveedorIds);
    //debugger;
    setSelectedProveedorIds(newSelectedProveedorIds);
    
    let variable =  newSelectedProveedorIds.length > 0 ? Proveedores.find(item => item.id === id) : null;
    if(variable != null) {
      let ProveedorObj = {
        id: variable.empresa.id,
        nombre: variable.empresa.nombre,
        ruc: variable.empresa.empresaRuc
      };
      console.log(ProveedorObj);
      //console.log(event.target.checked);
      sessionStorage.setItem('valueCheck', JSON.stringify(event.target.checked));
      let Arreglo = [ProveedorObj];
      //Arreglo.push(ProveedorObj);
      handleHijoProveedor(Arreglo);
    } else {
      handleHijoProveedor([]);
    }
  };

  const findIndex = (id) => {
    return Proveedores.findIndex(Proveedor => Proveedor.id === id);
  }

  const handleOnChangeCheck = (position) => {
    let list = checkedState;
    let updatedCheckedState = [];
    updatedCheckedState = list.map((item, index) => 
      index === position ? !item : false
    );
    //console.log("updatedCheck");
    //console.log( updatedCheckedState);
    setCheckedState(updatedCheckedState);
  }

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
                {Proveedores.slice(page * limit, page * limit + limit).map((Proveedor) => (
                  <TableRow
                    hover
                    key={Proveedor.id}
                    selected={selectedProveedorIds.indexOf(Proveedor.id) !== -1}
                  >
                    <TableCell padding="checkbox">
                      {checkedState.map((item, index) => {
                        if (index === findIndex(Proveedor.id)) {
                          return (<Checkbox
                            checked={item}
                            onChange={
                              /*() => handleOnChangeCheck(findIndex(Proveedor.id))*/
                              (event) => handleSelectOne(event, Proveedor.id)
                            }
                            value="true"
                          />);
                        }
                      })}
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
          page={page}
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
