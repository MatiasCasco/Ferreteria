import React, { useState, useContext, useEffect } from 'react';
import { ProductosContext } from '../../pages/facturaVentaAi';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const ModalProducto = ({ handleAgregarProducto }) => {
  const [productosAgregados, setProductosAgregados] = useContext(ProductosContext);
  const [cantidad, setCantidad] = useState({});
  const [productos, setProductos] = useState([
    {
      Id: 1,
      Nombre: "Martillo",
      Iva: 0.21,
      Medida: "30 cm",
      Descripcion: "Un martillo de metal con mango de madera",
      Precio: 15.99,
      Marca: "Stanley",
    },
    {
      Id: 2,
      Nombre: "Taladro",
      Iva: 0.21,
      Medida: "20 cm",
      Descripcion: "Un taladro eléctrico con batería recargable",
      Precio: 49.99,
      Marca: "Bosch",
    },
    {
      Id: 3,
      Nombre: "Destornillador",
      Iva: 0.21,
      Medida: "15 cm",
      Descripcion: "Un destornillador de punta plana",
      Precio: 4.99,
      Marca: "Truper",
    },
    {
      Id: 4,
      Nombre: "Llave inglesa",
      Iva: 0.21,
      Medida: "25 cm",
      Descripcion: "Una llave inglesa ajustable de acero",
      Precio: 9.99,
      Marca: "Bahco",
    },
    {
      Id: 5,
      Nombre: "Alicate",
      Iva: 0.21,
      Medida: "18 cm",
      Descripcion: "Un alicate universal con mango antideslizante",
      Precio: 7.99,
      Marca: "Knipex",
    },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    function buscarProductos(term) {
      setSearchResult(productos.filter((producto) => {
        return producto.Nombre.toLowerCase().includes(term.toLowerCase()) ||
          producto.Descripcion.toLowerCase().includes(term.toLowerCase()) ||
          producto.Marca.toLowerCase().includes(term.toLowerCase());
      }));
    }
  
    buscarProductos(searchTerm);
  }, [productos, searchTerm]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleClick = (event, producto) => {
    const newProducto = {
      Id: producto.Id,
      Nombre: producto.Nombre,
      Iva: producto.Iva,
      Medida: producto.Medida,
      Descripcion: producto.Descripcion,
      Precio: producto.Precio,
      Marca: producto.Marca,
      Cantidad: cantidad[producto.Id], // accedes a la cantidad del producto usando el id
    };
    setProductosAgregados([...productosAgregados, newProducto]);
    setCantidad({ ...cantidad, [producto.Id]: 0 }); // reinicias la cantidad del producto a cero
    console.log(productosAgregados);
  };

 
  const handleCantChange = (event, producto) => {
    setCantidad({ ...cantidad, [producto.Id]: event.target.value }); // actualizas el objeto con la cantidad del producto
  };

  const isButtonDisabled = (producto) => {
    return cantidad[producto.Id] === 0 || cantidad[producto.Id] === undefined || cantidad[producto.Id] === '';
  };

  return (
    <div>
      <TextField
        value={searchTerm}
        onChange={handleChange}
        placeholder="Buscar Producto"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th style={{ width: '13%' }}>IVA</th>
            <th style={{ width: '13%' }}>Medida</th>
            <th style={{ width: '20%' }}>Descripción</th>
            <th style={{ width: '13%' }}>Precio</th>
            <th style={{ width: '13%' }}>Marca</th>
            <th style={{ width: '13%' }}>Cantidad</th>
            <th style={{ width: '13%' }}>Agregar</th>
          </tr>
        </thead>
        <tbody>
          {searchResult.map((producto) => (
            <tr key={producto.Id}>
              <td style={{ textAlign: 'center' }}>{producto.Nombre}</td>
              <td style={{ textAlign: 'center' }}>{producto.Iva}</td>
              <td style={{ textAlign: 'center' }}>{producto.Medida}</td>
              <td style={{ textAlign: 'center' }}>{producto.Descripcion}</td>
              <td style={{ textAlign: 'center' }}>{producto.Precio}</td>
              <td style={{ textAlign: 'center' }}>{producto.Marca}</td>
              <td>
                <input
                  type="number"
                  onChange={(event) => handleCantChange(event, producto)}
                  value={cantidad[producto.Id] || ''}
                />
              </td>
              <td>
                <button
                  disabled={isButtonDisabled(producto)}
                  onClick={(event) => handleClick(event, producto)}
                >
                  Agregar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ModalProducto;
