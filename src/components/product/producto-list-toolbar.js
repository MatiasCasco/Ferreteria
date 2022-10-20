  import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    InputAdornment,
    SvgIcon,
    Typography,
    Switch, 
  } from '@mui/material';
  import { useState } from 'react';
  import { Download as DownloadIcon } from '../../icons/download';
  import { Search as SearchIcon } from '../../icons/search';
  import { Upload as UploadIcon } from '../../icons/upload';
 
  
  export const ProductoListToolbar = ({setEditing, listMarca, listCategoria, handlePadre, ...props}) => {
    //
    const [valueProducto, setValueProducto] = useState(" ");
    const [valueMarca, setValueMarca] = useState(" ");
    const [valueCategoria, setValueCategoria] = useState(" ");
    const [valueStock, setValueStock] = useState(0);
    const [showHideDemo1, setShowHideDemo1] = useState(false);
    const [valueStockMin, setValueStockMin] = useState(false);
    //

    //
    const handleChangeMarca = e => {
      setValueMarca(e.target.value);
      handleHijo(valueProducto, e.target.value, valueCategoria, valueStock, valueStockMin);
    }
    const handleChangeCategoria = e => {
      setValueCategoria(e.target.value);
      handleHijo(valueProducto, valueMarca, e.target.value, valueStock, valueStockMin);
    }
    const handleChangeStock = e => {
      setValueStock(e.target.value);
      handleHijo(valueProducto, valueMarca, valueCategoria, e.target.value, valueStockMin);
    }
    const handleChangeSwith = e => {
      setShowHideDemo1(e.target.checked);
      if (!e.target.checked) {
        setValueMarca(" ");
        setValueCategoria(" ");
        setValueStock(0);
        handleHijo(valueProducto, " ", " ", 0, valueStockMin);
      }
      
    }

    const handleChangeSwithStock = e => {
      setValueStockMin(e.target.checked);
      handleHijo(valueProducto, valueMarca, valueCategoria, valueStock, e.target.checked);
    }
    //
    const handleChange = e => {
      //console.log("handleChange");
      //console.log(e.target.value);

      setValueProducto(e.target.value);
      handleHijo(e.target.value, valueMarca, valueCategoria, valueStock, valueStockMin);
      Object.entries(e.target.value).length===0?(setEditing(false)):(setEditing(true));
    }

    const handleHijo = (producto, marca, categoria, stock, min) => {    
      handlePadre(producto, marca, categoria, stock, min);
    }

    
    return (<Box {...props}>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          m: -1
        }}
      >
        <Typography
          sx={{ m: 1 }}
          variant="h4"
        >
          Productos
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button
            startIcon={(<UploadIcon fontSize="small" />)}
            sx={{ mr: 1 }}
          >
            Import
          </Button>
          <Button
            startIcon={(<DownloadIcon fontSize="small" />)}
            sx={{ mr: 1 }}
          >
            Export
          </Button>
          <Button
            color="primary"
            variant="contained"
          >
            Add products
          </Button>
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
              
              <TextField
                  fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon
                        fontSize="small"
                        color="action"
                      >
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                          Opciones
                          <Switch
                            //checked={state.checkedB}
                            onChange={handleChangeSwith}
                            name="checkedB"
                            color="primary"
                          />                    
                    </InputAdornment>
                  )
                }}
                placeholder="Buscar producto"
                variant="outlined"
                onChange={handleChange}
              />
              
{/* las opciones de busquedad adicionales*/}
              <div>
                
                {showHideDemo1 && <TextField
                  select
                  label="Seleccionar"
                  //value={valueMarca}
                  onChange={handleChangeMarca}
                  placeholder="Seleccionar Marca"
                  variant="outlined"
                  disabled={!showHideDemo1.toString()}
                  SelectProps={{
                    native: true,
                  }}
                >
                  {listMarca.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </TextField>}

                {showHideDemo1 && <TextField
                  select
                  label="Seleccionar"
                  onChange={handleChangeCategoria}
                  placeholder="Seleccionar Categoria"
                  variant="outlined"
                  disabled={!showHideDemo1.toString()}
                  SelectProps={{
                    native: true,
                  }}
                >
                  {listCategoria.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </TextField>}

                {showHideDemo1 && <TextField
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={handleChangeStock}
                  placeholder="Buscar por stock"
                  variant="outlined"
                  disabled={!showHideDemo1.toString()}
                />}
                
                Lista de stock minimo
                <Switch
                      //checked={state.checkedB}
                      onChange={handleChangeSwithStock}
                      name="checkedC"
                      color="primary"
                />  
              </div>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
    );
  }
  