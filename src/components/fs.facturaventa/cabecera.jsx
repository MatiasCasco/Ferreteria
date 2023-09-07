import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { DatosEmpresa, GridItemandCard, PrimaryButton, GridContainerRow, MiddleWidthGridItem, FullWidthGridItem, BoxLabel } from 'src/constants/componentsPersonalite';
import Modal from 'react-modal';
import ModalCliente from './modalCliente';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import IconButton from '@mui/material/IconButton';
import { buscarClienteRuc } from '../../utils/ApiUtilsTemp';
import BuscadorCliente from './cliente/buscadorCliente';

const Cabecera = ({ }) => {
  const [modalIsOpen, setModalIsOpen] = useState();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    buscarCliente(searchTerm);
  }, [searchTerm]);

  const [cliente, setCliente] = useState({
    id: 0,
    nombre: "Sin Nombre",
    RucCi: "XX",
  });

  const handleOpen = () => {
    setModalIsOpen(!modalIsOpen);
  }

  const buscarCliente = async (term) => {
    if (!term) {
      return;
    } else {
      const data = await buscarClienteRuc(term);
      setCliente(data);
      console.log(data);
    }
  };


  return (
    <Grid container
      spacing={1}>
      <GridItemandCard>
        <DatosEmpresa />
      </GridItemandCard>
      < GridItemandCard>
        <GridContainerRow>
          < MiddleWidthGridItem>
            <BuscadorCliente setSearchTerm={setSearchTerm}
              placeholder={"Buscar Cliente"} />
          </MiddleWidthGridItem>
          <MiddleWidthGridItem>
            <IconButton aria-label="Agregar Cliente "
              onClick={handleOpen}>
              <PersonAddIcon />
            </IconButton>
          </MiddleWidthGridItem>
          <FullWidthGridItem>
            <BoxLabel>
              <label><b>Nombre del Cliente</b></label>  {cliente.nombre}
            </BoxLabel>
            <BoxLabel>
              <label><b>Ruc/Ci:</b></label> {cliente.RucCi}
            </BoxLabel>
          </FullWidthGridItem>
        </GridContainerRow>
      </GridItemandCard>

      <Modal isOpen={modalIsOpen}>
        <ModalCliente handleOpen />
        <PrimaryButton onClick={() => setModalIsOpen(false)}>
          Cerrar
        </PrimaryButton>
      </Modal>
    </Grid>
  );
};

export default Cabecera;