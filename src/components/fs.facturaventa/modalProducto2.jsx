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

  const crearNuevoProducto = (producto) => {
    let nuevoProducto = {
      Id: producto.Id,
      Nombre: producto.Nombre,
      Iva: producto.Iva,
      Categoria: producto.Categoria,
      Precio: producto.Precio,
      Marca: producto.Marca,
      Cantidad: `${cantidad[producto.Id]} ${producto.Medida}`,
      Subtotal: cantidad[producto.Id] * producto.Precio,
    };
    return nuevoProducto;
  };

  const actualizarProductosAgregados = (newProducto) => {
    const index = productosAgregados.findIndex(
      (item) => item.Id === newProducto.Id
    );
    if (index !== -1) {
      setProductosAgregados((prevProductosAgregados) => {
        const updatedProductosAgregados = [...prevProductosAgregados];
        const prevCantidad = parseInt(updatedProductosAgregados[index].Cantidad.split(' ')[0]);
        updatedProductosAgregados[index].Cantidad = `${prevCantidad + parseInt(newProducto.Cantidad)} ${updatedProductosAgregados[index].Cantidad.split(' ')[1]}`;
        updatedProductosAgregados[index].Subtotal += newProducto.Subtotal;
        return updatedProductosAgregados;
      });
    } else {
      setProductosAgregados([...productosAgregados, newProducto]);
    }
  };

  const handleClick = (event, producto) => {
    const newProducto = crearNuevoProducto(producto);
    actualizarProductosAgregados(newProducto);
    console.log(productosAgregados);
    setCantidad({ ...cantidad, [producto.Id]: 0 });
  };


  const buscarProductos = async (term) => {
    if (!term) {
      return;
    } else {
      const data = await searchProduct(term);
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
