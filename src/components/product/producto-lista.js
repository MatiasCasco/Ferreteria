import {  useEffect, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { Search as SearchIcon } from '../../icons/search';
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
  Button
} from '@mui/material';
import { getInitials } from '../../utils/get-initials';
import { PopUp } from '../popup';
import { Proveedor } from 'src/pages/proveedor';


export const ProductoLista = ({ productos, ...rest }) => {
  const [selectedProductoIds, setSelectedProductoIds] = useState([]);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const[idDet, setIdDet] = useState(0);
  // Este y este agregue
  const [active, setActive] = useState(false);

  useEffect(() => {
    // 👇️ some condition here
    if (productos[(page * limit)] === undefined) {
      setPage(0);
    }
  });
  // Este y este agregue
  const toggle = () => {
    setActive(!active);
    console.log(active);
  }

  const desplegar = (id) => {
    toggle();
    setIdDet(id);
  }
  const handleSelectAll = (event) => {
    let newSelectedProductoIds;

    if (event.target.checked) {
      newSelectedProductoIds = productos.map((producto) => producto.id);
    } else {
      newSelectedProductoIds = [];
    }

    setSelectedProductoIds(newSelectedProductoIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedProductoIds.indexOf(id);
    let newSelectedProductoIds = [];

    if (selectedIndex === -1) {
      newSelectedProductoIds = newSelectedProductoIds.concat(selectedProductoIds, id);
    } else if (selectedIndex === 0) {
      newSelectedProductoIds = newSelectedProductoIds.concat(selectedProductoIds.slice(1));
    } else if (selectedIndex === selectedProductoIds.length - 1) {
      newSelectedProductoIds = newSelectedProductoIds.concat(selectedProductoIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedProductoIds = newSelectedProductoIds.concat(
        selectedProductoIds.slice(0, selectedIndex),
        selectedProductoIds.slice(selectedIndex + 1)
      );
    }

    setSelectedProductoIds(newSelectedProductoIds);
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
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedProductoIds.length === productos.length}
                    color="primary"
                    indeterminate={
                      selectedProductoIds.length > 0
                      && selectedProductoIds.length < productos.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
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
                  key={producto.id}
                  selected={selectedProductoIds.indexOf(producto.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedProductoIds.indexOf(producto.id) !== -1}
                      onChange={(event) => handleSelectOne(event, producto.id)}
                      value="true"
                    />
                  </TableCell>
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
                        {getInitials(producto.producto.nombre)}
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {producto.producto.nombre}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {producto.producto.categoriaNombre}
                  </TableCell>
                  <TableCell>
                    {producto.marcaNombre}
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
                        desplegar(producto.id);
                      }}>
                        <SearchIcon color="action"/>
                        <Typography
                          color="textPrimary"
                          variant="body2"
                        >
                          {"Vista" + producto.id}
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
          <Proveedor idDet={idDet} />
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
