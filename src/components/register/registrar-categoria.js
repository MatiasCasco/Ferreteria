import React, { useEffect, useState } from 'react';
import { Formik, Field, Form } from 'formik';
import { TextField, Select, MenuItem, Button, InputLabel, Box } from '@mui/material';
import * as constStyle from '../../constants/constants_styles';

const RegistrarCategoria = () => {
  return (
    <div>
      <h1>Formulario de Categoria</h1>
      <Formik
        initialValues={{
          categoria: ''
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
              <div className={'form-flied-width-space'}>
                <TextField
                  className={'form-field-width'}
                  name="descripcion"
                  label="Descripción de la categoria"
                  onChange={handleChange}
                  value={values.descripcion}
                  InputProps={{ style: { color: constStyle.TEXT_FIELD_INPUT_COLOR } }}
                />
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
}

export default RegistrarCategoria;
