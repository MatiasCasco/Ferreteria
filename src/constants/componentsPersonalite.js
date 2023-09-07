import Button from '@mui/material/Button';
import { Box, Typography, Grid } from '@mui/material';
import { flexContainer } from 'src/constants/constans.styles';
import { Container, ImageList, ImageListItem } from "@mui/material";
import { Card, CardContent } from '@mui/material';



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
    /*useEffect(() => {
      const img = document.querySelector("img");
      if (img) {
        width.value = img.clientWidth;
        height.value = img.clientHeight;
      }
    }, [width, height]);*/
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
        sx={{ flexGrow: 1, py: 4 }}
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

export const FullWidthGridItem = (props) => (
    <Grid
        item
        xs={12}
        {...props}
    >
        {props.children}
    </Grid>
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