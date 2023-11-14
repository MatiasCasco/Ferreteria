import React from 'react';
import { Formik, Field, Form } from 'formik';
import { TextField, Select, MenuItem, Button, InputLabel, Box } from '@mui/material';


const RegistrarProducto = () => {
  // Aquí puedes poner tus categorías y marcas
  const categorias = [{ id: 1, nombre: 'Categoria 1' }, { id: 2, nombre: 'Categoria 2' }];
  const marcas = [{ id: 1, nombre: 'Marca 1' }, { id: 2, nombre: 'Marca 2' }];
  const unidades = ['kilo', 'litro', 'metro'];
  const porcentajeIva = ['5', '10'];

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
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
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
                {categorias.map((categoria) => (
                  <MenuItem key={categoria.id} value={categoria.id}>
                    {categoria.nombre}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div className={'form-field'}>
              <InputLabel id="unidad-medida-label">Unidad de medida</InputLabel>
              <Select className={'form-field-width'} name="unidad" label="Unidad" onChange={handleChange} value={values.unidad}>
                {unidades.map((unidad, index) => (
                  <MenuItem key={index} value={unidad}>
                    {unidad}
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
                {marcas.map((marca) => (
                  <MenuItem key={marca.id} value={marca.id}>
                    {marca.nombre}
                  </MenuItem>
                ))}
              </Select>
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
