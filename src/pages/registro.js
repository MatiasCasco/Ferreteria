import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Registro = () => {
  const router = useRouter();

  const productData = [
    {productoId: 1, productoNombre:"caño de 100", productoMedidaStock:"Metros", categoriaId: 1, marcaId:1, productoCosto:48000, productoPrecio:0, productoStockMax: 50, productoStockActual: 0, productoStokMin: 12},
    {productoId: 2, productoNombre:"caño de 50", productoMedidaStock:"Metros", categoriaId: 1, marcaId:1, productoCosto:36000, productoPrecio:0, productoStockMax: 50, productoStockActual: 0, productoStokMin: 12},
    {productoId: 3, productoNombre:"caño de 40", productoMedidaStock:"Metros", categoriaId: 1, marcaId:1, productoCosto:25000, productoPrecio:0, productoStockMax: 50, productoStockActual: 0, productoStokMin: 12}
  ];

  return (
    <>
      <Head>
        <title>
          Registro | Material Kit
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%'
        }}
      >
        <Container maxWidth="sm">
          <NextLink
            href="/"
            passHref
          >
            <Button
              component="a"
              startIcon={<ArrowBackIcon fontSize="small" />}
            >
              Dashboard
            </Button>
          </NextLink>
        </Container>
      </Box>
    </>
  );
};

export default Registro;
