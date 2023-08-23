import {  useEffect, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { Search as SearchIcon } from '../../icons/search';
import FormControlLabel from '@mui/material/FormControlLabel';
import {
  Avatar,
  Switch,
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Button
} from '@mui/material';
import { getInitials } from '../../utils/get-initials';
import { PopUp } from '../popup';
import { Proveedor } from 'src/pages/proveedor';


export const ProductoLista = ({ productos, borradorPedido, agregarBorrador, quitarBorrador, ...rest }) => {
  const [selectedProductoIds, setSelectedProductoIds] = useState([]);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const[idDet, setIdDet] = useState(0);
  const [active, setActive] = useState(false);

  useEffect(() => {
    // 👇️ some condition here
    if (productos[(page * limit)] === undefined) {
      setPage(0);
    }
  });

  const toggle = () => {
    setActive(!active);
    console.log("toggle");
    console.log(active);
    if (active) {
      let ProveedorSeleccionado = [];
      let valueCheck = JSON.parse(sessionStorage.getItem('valueCheck'));
      console.log(sessionStorage.getItem('valueCheck'))
      ProveedorSeleccionado = JSON.parse(sessionStorage.getItem('ProveedorSelected'))?JSON.parse(sessionStorage.getItem('ProveedorSelected')):[];
      let varBoolean = JSON.parse(sessionStorage.getItem('bool'));
      if (ProveedorSeleccionado.length > 0 && varBoolean === 1) {
        agregarBorrador(idDet, ProveedorSeleccionado[0]);
        sessionStorage.setItem('bool', JSON.stringify(0));
      }
      if (valueCheck === false && ProveedorSeleccionado.length > 0 && varBoolean === 1) {
        console.log("idDetalleProducto is");
        console.log(idDet);
        quitarBorrador(idDet);
        sessionStorage.setItem('bool', JSON.stringify(0));
      }
      if (ProveedorSeleccionado.length === 0 && varBoolean === 1){
        quitarBorrador(idDet);
      }
    }
  }

  const desplegar = (id) => {
    toggle();
    setIdDet(id);
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
  page > 0 ? Math.max(0, (1 + page) * limit - productos.length) : 0;

  return (
    <>
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1000 }}>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <TableHead>
              <TableRow>
                <TableCell>
                  Descripcion
                </TableCell>
                <TableCell>
                  Categoria
                </TableCell>
                <TableCell>
                  Marca
                </TableCell>
                <TableCell>
                  Stock Actual
                </TableCell>
                <TableCell>
                  Stock Minimo
                </TableCell>
                <TableCell>
                    Proveedores
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productos.slice(page * limit, page *limit + limit).map((producto) => (
                <TableRow
                  hover
                  key={producto.producto.productoId}
                  selected={selectedProductoIds.indexOf(producto.producto.productoId) !== -1}
                >
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Avatar
                        src={producto.producto.archivoimg2}
                        sx={{ mr: 2 }}
                      >
                        {getInitials(producto.producto.productoNombre)}
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {producto.producto.productoNombre}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {producto.producto.categoria.categoriaDescripcion}
                  </TableCell>
                  <TableCell>
                    {producto.marca.marcaDescripcion}
                  </TableCell>
                  <TableCell>
                    {producto.productoStockActual}
                  </TableCell>
                  <TableCell>
                    {producto.productoStockMin}
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                      }}
                    >
                      <Button onClick={()=>{
                        desplegar(producto.producto.productoId);
                      }}>
                        <SearchIcon color="action"/>
                        <Typography
                          color="textPrimary"
                          variant="body2"
                        >
                          {"Vista" + producto.producto.productoId}
                        </Typography>
                      </Button>
                    </Box>

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
        count={productos.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={
          page

        }
        rowsPerPage={limit}
        rowsPerPageOptions={[3, 5, 10, 25, 50, 100]}
      />

        <PopUp title={"Lista de proveedores"} active={active} toggle={toggle}>
          <Proveedor idDet={idDet} borradorPedido={borradorPedido} />
        </PopUp>

      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Acercar"
      />

    </Card>

    </>
  );
};

ProductoLista.propTypes = {
  productos: PropTypes.array.isRequired
};
