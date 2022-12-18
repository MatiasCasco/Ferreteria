import React, { Component, forwardRef, useState } from "react";
import { Search as SearchIcon } from '../icons/search';
import { Users as UsersIcon } from '../icons/users';
import Head from 'next/head';
import { Box, Container, Card, Switch, Button, Typography, Tooltip, IconButton } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import { CrudTable } from "src/components/crud/crud-table";
import { PopUp } from "src/components/popup";
import { CrudInterface } from "./crudInterface";


const Cruds = () => {
  
  const getCrudProveedores = () => {
    return <CrudTable/>;
  }  
  
  return (
    <>
      <Head>
        <title>
          Lista de crud | Material Kit
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 4
        }}
      >
        <Container maxWidth={true}>
          <Card>
            <Tooltip title="Crud de prodcuto">
              <Box>
                <IconButton sx={{ ml: 1 }}>
                  <UsersIcon fontSize="small" />
                </IconButton>
                Crud de producto
              </Box>
            </Tooltip>
            <Box />
            <Button onClick={()=>{
              <>
              <PopUp title="Hola" active={true} toggle={true} >
                <CrudTable/>
              </PopUp>
              </>
            }}>
              Crud de proveedor
            </Button>

          </Card>
        </Container>
      </Box>


    </>
  );
}
Cruds.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Cruds;
