import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { IconButtonClose } from '../../constants/componentsPersonalite';
import Toolbar from '@mui/material/Toolbar';

const ModalForm = ({ open, handleClose, children, onSubmit }) => {


  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent sx={{backgroundColor: "#2F4050", color: "white"}}>
          <Toolbar sx={{ display: "flex", justifyContent: "flex-end", margin: '0px',  color: "white"}}>
            <IconButtonClose onClick={handleClose} />
          </Toolbar >
            {children}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ModalForm;
