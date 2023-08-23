import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export function PopUp(props) {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');
  const {children, title , active, toggle} = props;
  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    toggle();
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (active) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  });

  return (
    <div>
      <Dialog
        open={active}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        maxWidth={true}
      >
        <DialogTitle id="scroll-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
           <div>{children}</div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{
              sessionStorage.setItem('bool', JSON.stringify(0));
              handleClose();
          }}>Cancear</Button>
          <Button onClick={()=>{
              sessionStorage.setItem('bool', JSON.stringify(1));
              handleClose();
            }} autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
