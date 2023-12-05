import React, { useEffect, useState } from 'react';
import { Formik, Field, Form } from 'formik';
import { TextField, Select, MenuItem, Button, InputLabel, Box } from '@mui/material';
import * as ApiUtils from '../../utils/api-utils';
import * as ApiUrl from '../../constants/apiUrls';
import * as constStyle from '../../constants/constants_styles';
import { MARCA_ADD } from '../../constants/apiUrls';

const RegistrarMarca = ({onSubmit}) => {



  return (
    <div>
      <h1>Formulario de Marca</h1>
      <Formik
        initialValues={{
          marca: ''
        }}
        onSubmit={onSubmit} // Use la función onSubmit pasada como prop
      >
        {({ isSubmitting, handleChange, values }) => (
          <div className={'group-content'}>
            <Form>
              <div className={'form-flied-width-space'}>
                <TextField
                  className={'form-field-width'}
                  name="marca"
                  label="Descripción de la marca"
                  onChange={handleChange}
                  value={values.marca}
                  InputProps={{ style: { color: constStyle.TEXT_FIELD_INPUT_COLOR } }}
                />
                <div>
                  <Button type="submit"  variant="contained" color="primary" >
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

export default RegistrarMarca;
