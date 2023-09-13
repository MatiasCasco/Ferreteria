import React, { Component, forwardRef, useState } from "react";
import ReactDOM from "react-dom";
import { DataGrid } from '@mui/x-data-grid';
//import { forwardRef } from 'react';
import Head from 'next/head';
import { Box, Container, Card, Switch } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import { CrudTable } from 'src/components/crud/crud-table';
//import MaterialTable from 'material-table';
import PerfectScrollbar from 'react-perfect-scrollbar';
//import {Edit, DeleteOutline, AddBox} from '@material-ui/icons';
import FormControlLabel from '@mui/material/FormControlLabel';
import {
  AddBox, ArrowDownward, Check, ChevronLeft, ChevronRight, Clear, DeleteOutline, Edit, FilterList, FirstPage, LastPage,
  Remove, SaveAlt, Search, ViewColumn
} from '@mui/material';

const CrudProveedor = () => {
  const [dense, setDense] = useState(false);
  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };
  const columns = [
    {
      title: 'Artista',
      field: 'artista'
    },
    {
      title: 'Pais de Origen',
      field: 'pais'
    },
    {
      title: 'Genero(s)',
      field: 'genero'
    },
    {
      title: 'Ventas estimadas (en millones)',
      field: 'ventas',
      type: 'numeric'
    }
  ]

  const data = [
    { artista: 'The Beatles', pais: 'Reino Unido', genero: 'Rock, pop', ventas: 1000 },
    { artista: 'Elvis Presley', pais: 'Estados Unidos', genero: 'Rock and roll, country', ventas: 1000 },
    { artista: 'Michael Jackson', pais: 'Estados Unidos', genero: 'Pop, rock, dance, R&B', ventas: 600 },
    { artista: 'Madonna', pais: 'Estados Unidos', genero: 'Pop, rock', ventas: 400 },
    { artista: 'Elton John', pais: 'Reino Unido', genero: 'Pop, rock', ventas: 350 }
  ];
  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };/*
  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  };*/

  /*return (
    <>
      <Head>
        <title>
          Crud Proveddor | Material Kit
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth={false}>
          <CrudTable />

          <Box sx={{ mt: 3 }}>

            <MaterialTable
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? 'small' : 'medium'}
              icons={tableIcons}
              columns={columns}
              data={data}
              title="Artistas Musicales con Mayores Ventas"
              actions={[
                {
                  icon: tableIcons.Edit,
                  tooltip: 'Editar Artista',
                  onClick: (event, rowData) => alert("Has presionado editar al artista " + rowData.artista)
                },
                {
                  icon: tableIcons.Delete,
                  tooltip: 'Delete Artista',
                  onClick: (event, rowData) => window.confirm("Estas seguro que deseas eliminar al artista " + rowData.artista + '?')
                }
              ]}
              options={{
                actionsColumnIndex: -1
              }}
              localization={{
                header: {
                  actions: 'Acciones'
                }
              }}
            />

          </Box>

        </Container>
      </Box>
    </>
  );*/
  return (
    <>
      <Head>
        <title>
          Crud Proveddor | Material Kit
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 4
        }}
      >
        <Container maxWidth={false}>
          <Card>
          <DataGrid
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            icons={tableIcons}
            columns={columns}
            data={data}
            title="Artistas Musicales con Mayores Ventas"
            actions={[
              {
                icon: tableIcons.Edit,
                tooltip: 'Editar Artista',
                onClick: (event, rowData) => alert("Has presionado editar al artista " + rowData.artista)
              },
              {
                icon: tableIcons.Delete,
                tooltip: 'Delete Artista',
                onClick: (event, rowData) => window.confirm("Estas seguro que deseas eliminar al artista " + rowData.artista + '?')
              }
            ]}
            options={{
              actionsColumnIndex: -1,
              rowStyle: {
                height: (dense ? 0 : 63),
              }
            }}
            localization={{
              header: {
                actions: 'Acciones'
              }
            }}
          />

          <FormControlLabel
            control={<Switch checked={dense} onChange={handleChangeDense} />}
            label="Acercar"
          />
          </Card>
        </Container>
      </Box>


    </>
  );
}
CrudProveedor.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default CrudProveedor;
