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
  Button,
  Grid
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
  const [positionAlertAdvertencia, setPositionAlertAdvertencia] = useState(null);
  const [showHidenAlertAdvertencia, setshowHidenAlertAdvertencia] = useState(false);
  const [showHidenAlertInfo, setShowHidenAlertInfo] = useState(true);


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
    let selected = findIndex(id);
    handleOnChangeCheck(selected.index);

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
      sessionStorage.setItem('valueCheck', event.target.checked !== null && event.target.checked !== undefined ? JSON.stringify(event.target.checked):sessionStorage.getItem('valueCheck'));
      let Arreglo = [ProveedorObj];
      //Arreglo.push(ProveedorObj);
      handleHijoProveedor(Arreglo);
      if (event.target.checked === true || sessionStorage.getItem('valueCheck') === true) {
        findMenorCosto(selected);
      }

    } else {
      handleHijoProveedor([]);
    }
  };

  const findIndex = (id) => {
    let selected = {index: 0, item: " "}
    selected.index = Proveedores.findIndex(Proveedor => Proveedor.empresa.empresaId === id);
    selected.item = Proveedores[selected.index];
    return selected;
  }

  const findMenorCosto = (selected) => {
    let position;
    for (let i = 0; i < Proveedores.length; i++) {
      if (selected.item.precioVenta > Proveedores[i].precioVenta) {
        position = i;
      }
      if (position !== undefined) {
        if (Proveedores[position].precioVenta > Proveedores[i].precioVenta) {
          position = i;
        }
      }
    }
    if (position !== undefined) {
      setshowHidenAlertAdvertencia(true);
      setPositionAlertAdvertencia(position);
    }
    if (position === undefined) {
      setshowHidenAlertAdvertencia(false);
    }
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
      {showHidenAlertInfo && <Alert onClose={() => {setShowHidenAlertInfo(false)}} autoHideDuration={10000} variant="filled" severity="info" > Seleccione proveedor para el producto </Alert>}
      {showHidenAlertAdvertencia && <Alert onClose={() => { setshowHidenAlertAdvertencia(false) }} variant="filled" severity="warning" >
        <Grid direction="row" justifyContent="center" alignItems="center" spacing={4}>
            Existe una opcion menos costosa
            <Box sx={{ pl: 2 }}/>
            <Button onClick={() => { handleSelectOne(event, Proveedores[positionAlertAdvertencia].id) }} color="inherit" size="small">
              Seleccionar menos costosa
            </Button>
        </Grid>
      </Alert>}

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
                    key={Proveedor.empresa.empresaId}
                    selected={selectedProveedorIds.indexOf(Proveedor.empresa.empresaId) !== -1}
                  >
                    <TableCell padding="checkbox">
                      {checkedState.map((item, index) => {
                        if (index === findIndex(Proveedor.empresa.empresaId).index) {
                          return (<Checkbox
                            checked={item}
                            onChange={
                              /*() => handleOnChangeCheck(findIndex(Proveedor.id))*/
                              (event) => handleSelectOne(event, Proveedor.empresa.empresaId)
                            }
                            value="true"
                          />);
                        }
                      })}
                    </TableCell>
                    <TableCell>
                      {Proveedor.empresa.empresaNombre}
                    </TableCell>
                    <TableCell>
                      {Proveedor.empresa.empresaRuc}
                    </TableCell>
                    <TableCell>
                      {Proveedor.precioVentaProveedor}
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
