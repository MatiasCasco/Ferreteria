import PropTypes from 'prop-types';
import { Avatar, Box, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import { Clock as ClockIcon } from '../../icons/clock';
import { Download as DownloadIcon } from '../../icons/download';

export const ProductoTarjeta = ({ product, ...rest }) => (
  
  <Card
    sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }}
    {...rest}
  >
    <CardContent>
     
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          pb: 1         
        }}
      >

        <Avatar
          alt="Product"
          src={product.producto.archivoimg2}
          variant="square"
          sx={{
            m: 3,
            width: 120,
            height: 120,
          }}
        />
         
        <Divider orientation="vertical" flexItem sx={{m:1}}/>
        
        <Box>

          <Typography
            align="center"
            color="textPrimary"
            gutterBottom
            variant="h5"
          >
            {product.producto.categoriaNombre}
          </Typography>
          <Typography
            align="start"
            color="textPrimary"
            variant="body3"
          >
            <Box sx={{ pt: 2 }}></Box>
            {product.producto.nombre}
          </Typography>
          <Grid
            containter
            sx={{
              justifyContent: 'center'
            }}
          >
            <Typography
              align="start"
              color="textPrimary"
              variant="h6"
            >
              <Box sx={{ pt: 1 }}></Box>
              {" Stock Actual: " + product.productoStockActual + " " + product.producto.medidaStock}
            </Typography>

            <Typography
              align="start"
              color="textPrimary"
              variant="h6"
            >
              <Box sx={{ pt: 1 }}></Box>
              {" Stock Minimo: " + product.productoStockMin + " " + product.producto.medidaStock}
            </Typography>
          </Grid>
          <Typography
            align="center"
            color="textPrimary"
            variant="h6"
          >
            <Box sx={{ pt: 1 }}></Box>
            {"Marca: " + product.marcaNombre}
          </Typography>

        </Box>

        <Divider orientation="vertical" flexItem sx={{m:1}}/>

        <Box sx={{ p: 2 }}>
          <Grid   
            sx={{ 
              justifyContent: 'center' }}
          >
            <Grid
              item
              sx={{
                alignItems: 'center',
                display: 'flex'
              }}
            >
              <ClockIcon color="action" />
              <Typography
                color="textSecondary"
                display="inline"
                sx={{ pl: 1 }}
                variant="body2"
              >
                Updated 2hr ago
              </Typography>
            </Grid>
            <Box sx={{ pt: 2 }}/>
            <Grid
              item
              sx={{
                alignItems: 'center',
                display: 'flex'
              }}
            >
              <DownloadIcon color="action" />
              <Typography
                color="textSecondary"
                display="inline"
                sx={{ pl: 1 }}
                variant="body2"
              >
                {product.totalDownloads}
                {' '}
                Downloads
              </Typography>
            </Grid>
          </Grid>

        </Box>
        
      </Box>
      
      
    </CardContent>
    <Box sx={{ flexGrow: 1 }} />
    <Divider />
    <Box sx={{ p: 2 }}>
      <Grid
        container
        spacing={2}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid
          item
          sx={{
            alignItems: 'center',
            display: 'flex'
          }}
        >
          <ClockIcon color="action" />
          <Typography
            color="textSecondary"
            display="inline"
            sx={{ pl: 1 }}
            variant="body2"
          >
            Updated 2hr ago
          </Typography>
        </Grid>
        <Grid
          item
          sx={{
            alignItems: 'center',
            display: 'flex'
          }}
        >
          <DownloadIcon color="action" />
          <Typography
            color="textSecondary"
            display="inline"
            sx={{ pl: 1 }}
            variant="body2"
          >
            {product.totalDownloads}
            {' '}
            Downloads
          </Typography>
        </Grid>
      </Grid>
    </Box>
  </Card>
);

ProductoTarjeta.propTypes = {
  producto: PropTypes.object.isRequired
};
