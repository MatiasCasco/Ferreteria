import React, { useState, useContext, useEffect } from 'react';
import Button from '@mui/material/Button';
import { Box, Typography, Grid, Tooltip } from '@mui/material';
import { flexContainer } from 'src/constants/constans.styles';
import { Container, ImageList, ImageListItem } from "@mui/material";
import { Card, CardContent, TextField, TableContainer, Table, TableFooter, SvgIcon } from '@mui/material';

import Dialog from '@mui/material/Dialog';
import { Grow } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { forwardRef } from 'react';

var phantom = {
    display: 'block',
    padding: '20px',
    height: '60px',
    width: '100%',
}
var style = {
    ///backgroundColor: "#F8F8F8",
    backgroundColor: "green",
    borderTop: "1px solid #E7E7E7",
    ///textAlign: "center",
    //padding: "20px",
    position: "fixed",
    //left: "0",
    //bottom: "0",
    //height: "60px",
    //width: "100%",
}



export const StickyFooter = (props) => {
    return (
        <TableFooter style={style} sx={12}>

            {props.children}

        </TableFooter>
    );

}



export const TextFieldNumeric = ({ value, onChange, label, ...props }) => {
    return (
        <TextField
            id="outlined-controlled"
            variant="outlined"
            type="number"
            value={value}
            label={label}
            onChange={onChange}
            sx={{ width: { sm: 80, md: 80 }, }}
            {...props}
        />
    )
}

/*
<TextField
                    id="standard-basic"
                    min="1"
                    label={producto.Medida}
                    variant="standard"
                    type='number'
                    onChange={(event) => handleCantChange(event, producto)}
                    value={cantidad[producto.Id] || ''}
                  />*/
export const DatosEmpresas = (props) => {
    return (
        <>
            <Typography>Ferreteria Casa San Roque</Typography>
            <Typography><b>Timbrado nro.</b> 4454654132146</Typography>
            <span><b>Fecha inicio viegencia:</b> 08/08/23</span>
            <span>  <b>Fecha inicio viegencia:</b> 01/08/24</span>
            <Typography><b>RUC</b> nro. 4454654132146</Typography>
            <Typography></Typography>
        </>
    );
};


export const DatosEmpresa = (props) => {
    return (
        <>
            <Typography>Ferreteria Casa San Roque</Typography>
            <Typography><b>Timbrado nro.</b> 4454654132146</Typography>
            <span><b>Fecha inicio viegencia:</b> 08/08/23</span>
            <span>  <b>Fecha inicio viegencia:</b> 01/08/24</span>
            <Typography><b>RUC</b> nro. 4454654132146</Typography>
            <Typography></Typography>
        </>
    );
};

export const TableStickyContainer = (props) => {
    return (
        <Card sx={{ width: '100%', overflow: 'hidden', mt: 1 }}>
            <CardContent>
                <TableContainer sx={{ maxHeight: 400 }}>
                    <Table stickyHeader enableStickyFooter={true}>
                        {props.children}
                    </Table>
                </TableContainer>
            </CardContent>

        </Card>
    );
};


export const FullWidthGridItem = (props) => (
    <Grid
        item
        xs={12}
        {...props}
    >
        {props.children}
    </Grid>
);

export const GridItemandCard = (props) => {
    return (
        <Grid item
            xs={6}>
            <Box sx={{ mt: 3 }}>
                <Card >
                    <CardContent sx={{ height: 200 }}>
                        {props.children}
                    </CardContent>
                </Card>
            </Box>
        </Grid>
    );
}



export const GridContainerRow = (props) => {
    return (
        <Grid container
            spacing={1}
            direction="row"
            {...props}
        >
            {props.children}
        </Grid>
    );
}


export const ImageNotFound = () => {

    return (
        <div>
            <img
                src="/static/images/not_found.png"
                width="25%"
                height="20%"
            />
            <span>
                <Typography
                    variant="h5"
                    sx={{ m: 1 }}>No hay datos para mostrar
                </Typography>
            </span>
        </div>
    );
};

export const Image = ({ width, height, src }) => {
    return (
        <div>
            <img
                src={src}
                width={width}
                height={height}
            />
            <span>
                <Typography
                    variant="h5"
                    sx={{ m: 1 }}>No hay datos para mostrar
                </Typography>
            </span>
        </div>
    );
};


/*
const images = [
    {
      src: "/static/images/not_found.png",
      title: "Primera imagen",
      featured: false,
    },
  ] */
export const ImageContainer = (props) => {
    const cols = [2, 3];
    return (
        <Container maxWidth="lg">
            <ImageList cols={cols}>
                {props.images.map((image) => (
                    <ImageListItem key={image.src}
                        cols={image.featured ? 2 : 1}>
                        <img src={image.src}
                            alt={image.title} />
                    </ImageListItem>
                ))}
            </ImageList>
        </Container>
    );
}





export const PrimaryButton = (props) => (
    <Button
        color="primary"
        variant="contained"
        {...props}
    >
        {props.children}
    </Button>
);

export const H4Typography = (props) => (
    <Typography
        variant="h4"
        sx={{ m: 1 }}
        {...props}
    >
        {props.children}
    </Typography>
);

export const BoxFlex = (props) => (
    <Box
        sx={flexContainer}
        {...props}
    >
        {props.children}
    </Box>
);

export const BoxMain = (props) => (
    <Box
        component="main"
        sx={{ flexGrow: 1, py: 0 }}
        {...props}
    >
        {props.children}
    </Box>
);

export const BoxM1 = (props) => (
    <Box
        sx={{ m: 1 }}
        {...props}
    >
        {props.children}
    </Box>
);


export const MiddleWidthGridItem = (props) => (
    <Grid
        item
        xs={6}
        {...props}
    >
        {props.children}
    </Grid>
);
export const GridContainerColumnCenter = (props) => (
    <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        {...props}>
        {props.children}
    </Grid>
);

export const BoxLabel = (props) => (
    <Box sx={{ backgroundColor: "#f5f5f5", padding: "5px" }}
        {...props}
    >
        {props.children}
    </Box>
);

export const IconButtonClose = (props) => (
    <IconButton
        edge="end"
        color="inherit"
        aria-label="close"
        {...props}
    >
        <CloseIcon />
    </IconButton>
);

export const BoxCardFull = (props) => {
    return (
        <Box xs={12} sx={{ mt: 0, justifyContent: "center" }}>
            <Card>
                <CardContent>
                    <Grid container justifyContent="center">
                        <Grid item xs={12}>
                            {props.children}
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    );
};

export const IconButtonAdd = (props) => (

    <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Tooltip title="Agregar producto" placement="top">
            <IconButton size="large"  {...props}
                sx={{ color: "#2e7d32" }}>
                <AddCircleIcon />
            </IconButton>
        </Tooltip>
    </Box>
);