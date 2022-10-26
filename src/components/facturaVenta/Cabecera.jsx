import React from 'react';
import {
    Box,
    Button,
    Container,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    TextField,Typography
  } from '@mui/material';
import { AccountProfile } from '../account/account-profile';
import { AccountProfileDetails } from '../account/account-profile-details';

const Cabecera=({empleado})=> {
    const fechaActual=new Date();
    return (
        <div>
        cliente
        
        <Grid container >
        <Grid
            item
            lg={12}
            md={12}
            xs={12}
        >
            <form
                autoComplete="off"
                noValidate
            >
                <Card>
                    <CardHeader
                    subheader={"Cajero nro: "+empleado.id+" "+empleado.nombre+" "+empleado.Apellido}
                    title={"FERRETERIA CASA SAN ROQUE   "+fechaActual.toLocaleDateString()}
                    />
                    <Divider />
                    <CardContent>
                    </CardContent>
                </Card>
            </form>
        </Grid>
        </Grid>
 
        
        
        </div>
    )
}

export default Cabecera