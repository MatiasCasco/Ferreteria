import Button from '@material-ui/core/Button';
import { Box, Typography, Grid } from '@material-ui/core';
import { flexContainer } from 'src/constants/constans.styles';

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
        sx={{ flexGrow: 1, py: 8 }}
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