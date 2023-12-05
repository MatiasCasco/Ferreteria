import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { IconButtonClose } from '../../constants/componentsPersonalite';
import Toolbar from '@mui/material/Toolbar';

const ModalForm = ({ open, handleClose, children, onSubmit }) => {
  /*const handleSubmit =  async (event) => {
    // event.preventDefault();
    // Obtén los datos del formulario (por ejemplo, utilizando un FormData)
    const formData = new FormData(event.target);
    // Llama a la función onSubmit pasando los datos del formulario
    // await onSubmit(formData);
    // Cierra el modal
    handleClose();
  };*/

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent sx={{backgroundColor: "#2F4050", color: "white"}}>
          <Toolbar sx={{ display: "flex", justifyContent: "flex-end", margin: '0px',  color: "white"}}>
            <IconButtonClose onClick={handleClose} />
          </Toolbar >
          {/*<form onSubmit={handleSubmit}>*/}
            {children}
          {/*</form>*/}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ModalForm;
