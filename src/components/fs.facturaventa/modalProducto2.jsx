import React, { useState, useContext, useEffect } from 'react';
import { ProductosContext } from '../../pages/facturaVentaAi';
import BuscadorProductos from './buscadorProductos';
import TablaProductos from './tablaProducto';
import { searchProduct } from 'src/utils/ApiUtilsTemp';

const ModalProducto = ({ handleAgregarProducto }) => {
  const [productosAgregados, setProductosAgregados] = useContext(ProductosContext);
  const [cantidad, setCantidad] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    buscarProductos(searchTerm);
  }, [searchTerm]);

  const handleClick = (event, producto) => {
    const newProducto = {
      Id: producto.Id,
      Nombre: producto.Nombre,
      Iva: producto.Iva,
      Medida: producto.Medida,
      Categoria: producto.Categoria,
      Precio: producto.Precio,
      Marca: producto.Marca,
      Cantidad: cantidad[producto.Id], // accedes a la cantidad del producto usando el id
    };
    const index = productosAgregados.findIndex(
      (item) => item.Id === newProducto.Id
    );
    if (index !== -1) {
      setProductosAgregados((prevProductosAgregados) => {
        const updatedProductosAgregados = [...prevProductosAgregados];
        updatedProductosAgregados[index].Cantidad += newProducto.Cantidad;
        return updatedProductosAgregados;
      });
    } else {
      setProductosAgregados([...productosAgregados, newProducto]);
    }
    setCantidad({ ...cantidad, [producto.Id]: 0 }); // reinicias la cantidad del producto a cero
  };

  const buscarProductos = async (term) => {
    if (!term) {
        return;
      }else{    
    const data  = await searchProduct(term);
        setSearchResult(data);
    }
  };

  const handleCantChange = (event, producto) => {
    setCantidad({ ...cantidad, [producto.Id]: event.target.value }); // actualizas el objeto con la cantidad del producto
  };

  return (
    <div>
      <BuscadorProductos setSearchTerm={setSearchTerm} />
      <TablaProductos
        searchResult={searchResult}
        handleCantChange={handleCantChange}
        handleClick={handleClick}
        cantidad={cantidad}
      />
    </div>
  );
}

export default ModalProducto;
