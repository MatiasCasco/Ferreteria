import React, { useEffect, useState } from 'react';
import { Formik, Field, Form } from 'formik';
import { TextField, Select, MenuItem, Button, InputLabel, Box } from '@mui/material';
import * as Icons from '@mui/icons-material';
import * as ApiUtils from '../../utils/api-utils';
import * as ApiUrl from '../../constants/apiUrls';
import ModalForm from '../modal-insert/modal-form';
import RegistrarMarca from './registrar-marca';
import RegistrarCategoria from './registrar-categoria';


const RegistrarProducto = ({handleClick}) => {

  // Aqui va los useState
  const [unidades, setUnidades] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  // Aqui va los useEffect
  useEffect(() => {
    findListUnidades();
    // findListMarcas();
    findListCategorias();
  }, []);

  // Funciones para avanzar y retroceder
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

// Llamar a findListMarcas con la página actual
  useEffect(() => {
    findListMarcas(currentPage);
  }, [currentPage]);

  const addCategoria = async (data) => {
    /*{
      "categoriaId": 0,
      "categoriaDescripcion": "string"
    }*/
    console.log(data);
    let url = ApiUtils.buildURL(ApiUrl.BASE_URL, ApiUrl.CAJA_ADD);
    console.log("La url es:...."+url);
    const json = await ApiUtils.postMCS(url,data);
    alert(json.content);
  }

  const addMarca = async (data) => {
    console.log("ADD MARCA")
    console.log(data)

    console.log('Antes de la llamada a la API');
    let url = ApiUtils.buildURL(ApiUrl.BASE_URL, ApiUrl.MARCA_ADD);
    debugger;
    let marca = {
      "marcaDescripcion": data.marca
    }
    console.log(marca);
    try {
      let json = await ApiUtils.postMCS(url, marca);
      console.log('Después de la llamada a la API', json);
      // alert(json);
      return json;
    } catch (error) {
      console.error('Error en la llamada a la API', error);
      alert('Error en la llamada a la API');
    }
  }

  const findListUnidades = async () => {
    let url = ApiUtils.buildURL(ApiUrl.BASE_URL, ApiUrl.UNIDAD_DE_MEDIDAS);
    const json = await ApiUtils.getMCS(url);
    setUnidades(json.content);
  }

  const findListMarcas = async (page=1, pageSize=5) => {
    let url = ApiUtils.buildURL(ApiUrl.BASE_URL, ApiUrl.MARCA_ALL);
    const json = await ApiUtils.getMCS(url, page, pageSize);
    setMarcas(json.content);
  }

  const findListCategorias = async () => {
    let url = ApiUtils.buildURL(ApiUrl.BASE_URL, ApiUrl.CATEGORIA_ALL);
    const json = await ApiUtils.getMCS(url);
    setCategorias(json.content);
  }

  // Define el estado para controlar si el modal está abierto o cerrado
  const [openMarca, setOpenMarca] = useState(false);
  const [openCategoria, setOpenCategoria] = useState(false);

  // Define la función para abrir el modal
  const handleClickOpenMarca = () => {
    setOpenMarca(true);
  }
  const handleClickOpenCategoria = () => {
    setOpenCategoria(true);
  }

  // Define la función para cerrar el modal
  const handleCloseMarca = () => {
    setOpenMarca(false);
    console.log('Modal de Marca cerrado');
  }

  const hanldeCloseCategoria = () => {
    setOpenCategoria(false);
  }


  const handleSubmitMarca = async (formData) => {
    console.log("handleSubmitMarca")
    console.log("Marca");
    debugger;
    const json = await addMarca(formData);
    setOpenMarca(false)
    console.log('Después de la llamada a la API', json);
    alert(json.marcaDescripcion);
  }

  const handleSubmitCategoria = (values) => {
    console.log(values);
    debugger;
    hanldeCloseCategoria();
  }

  return (
    <div>
      <h1>Formulario de Producto</h1>
      <Formik
        initialValues={{
          descripcion: '',
          iva: '',
          categoria: '',
          unidad: '',
          stock_max: 10,
          stock_min: 6,
          marca: ''
        }}
        onSubmit={(values, { setSubmitting }) => {
          // Lógica de envío a la API o cualquier acción necesaria
          console.log(values);

          // Cerrar el modal u otras acciones después de enviar el formulario
          handleCloseMarca();
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
          }, 400);
          // Restablecer el estado de Formik
          setSubmitting(false);
          handleClick();
        }}
      >
        {({ isSubmitting, handleChange, values }) => (
       <div className={'group-content'}>
          <Form>
            <div className={'form-field'}>
              <TextField className={'form-field-width'} name="descripcion" label="Descripción del Producto" onChange={handleChange} value={values.descripcion} />
            </div>
            <div className={'form-field'}>
              <TextField className={'form-field-width'} name="iva" label="IVA" onChange={handleChange} value={values.iva} />
            </div>
            <div className={'form-field'}>
              <InputLabel id="categoria-label">Categoría</InputLabel>
              <Select labelId="categoria-label" className={'form-field-width'} name="categoria" onChange={handleChange} value={values.categoria}>
                {categorias.map((categoria, index) => (
                  <MenuItem key={index} value={categoria.categoriaId}>
                    {categoria.categoriaDescripcion}
                  </MenuItem>
                ))}
              </Select>
              <Button
                startIcon={(<Icons.ControlPointSharp fontSize="small" />)}
                sx={{ mr: 1 , ml: 1 }}
                onClick={handleClickOpenCategoria}
              >
                Añadir Categoria
              </Button>
              <ModalForm open={openCategoria} handleClose={hanldeCloseCategoria} title="Añadir Marca" onSubmit={handleSubmitCategoria}>
                <RegistrarCategoria/>
              </ModalForm>
            </div>
            <div className={'form-field'}>
              <InputLabel id="unidad-medida-label">Unidad de medida</InputLabel>
              <Select className={'form-field-width'} name="metrica" label="Metrica" onChange={handleChange} value={values.metrica}>
                {unidades.map((unidad, index) => (
                  <MenuItem key={index} value={unidad.unidadMedidaBaseId}>
                    {unidad.unidadMedida}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div className={'form-field'}>
              <div className={'form-between'}>
                <TextField type="number" name="stock_max" label="Stock Máximo" onChange={handleChange} value={values.stock_max} />
                <TextField type="number" name="stock_min" label="Stock Mínimo" onChange={handleChange} value={values.stock_min} />
              </div>
            </div>
            <div className={'form-field'}>
              <InputLabel id="marca-label">Marca</InputLabel>
              <Select className={'form-field-width'} name="marca" onChange={handleChange} value={values.marca}>
                {marcas.map((marca, index) => (
                  <MenuItem key={index} value={marca.marcaId}>
                    {marca.marcaDescripcion}
                  </MenuItem>
                ))}
              </Select>
              <Button onClick={prevPage}>Anterior</Button>
              <Button onClick={nextPage}>Siguiente</Button>
              <Button
                startIcon={(<Icons.ControlPointSharp fontSize="small" />)}
                sx={{ mr: 1 , ml: 1 }}
                onClick={handleClickOpenMarca}
              >
                Añadir Marca
              </Button>
              <ModalForm open={openMarca} handleClose={handleCloseMarca} onSubmit={handleSubmitMarca}>
                <RegistrarMarca onSubmit={handleSubmitMarca}/>
              </ModalForm>
            </div>
            <div>
              <Button type="submit" disabled={isSubmitting} variant="contained" color="primary">
                Enviar
              </Button>
            </div>
          </Form>
       </div>
        )}
      </Formik>
    </div>
  );
};

export default RegistrarProducto;
