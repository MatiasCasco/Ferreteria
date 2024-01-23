import React, { useEffect, useState } from 'react';
import { Formik, Field, Form } from 'formik';
import { TextField, Select, MenuItem, Button, InputLabel, Box } from '@mui/material';
import * as constStyle from '../../constants/constants_styles';

const RegistrarCategoria = ({onSubmit}) => {
  return (
    <div>
      <h1>Formulario de Categoria</h1>
      <Formik
        initialValues={{
          categoria: ''
        }}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, handleChange, values }) => (
          <div className={'group-content'}>
            <Form>
              <div className={'form-flied-width-space'}>
                <TextField
                  className={'form-field-width'}
                  name="categoria"
                  label="Descripción de la categoria"
                  onChange={handleChange}
                  value={values.categoria}
                  InputProps={{ style: { color: constStyle.TEXT_FIELD_INPUT_COLOR } }}
                />
                <div>
                  <Button type="submit" variant="contained" color="primary">
                    Enviar
                  </Button>
                </div>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
}

export default RegistrarCategoria;
