import React, { useState, useContext, useEffect } from 'react';
import { ProductsContext } from '../../pages/recepcion';
import Buscador from '../fs.facturaventa/buscador';
import { searchProduct } from 'src/utils/ApiUtilsTemp';
import toast, { Toaster } from 'react-hot-toast';
import { PrimaryButton } from 'src/constants/componentsPersonalite';
import TablaProductosEnRecepcion from './tabla-producto-recepcion';

const ModalRecepcion = ({onRequestClose}) => {
  const [productosAgregados, setProductosAgregados] = useContext(ProductsContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    buscarProductos(searchTerm);
  }, [searchTerm]);

 /* useEffect(() => {
    debugger
    console.log("Valor de productos agregados")
    console.log(productosAgregados);
  })*/

  const crearNuevoProducto = (producto) => {
    let nuevoProducto = {
      Id: producto.Id,
      Nombre: producto.Nombre,
      Iva: producto.Iva,
      Categoria: producto.Categoria,
      Precio: producto.Precio,
      Marca: producto.Marca,
      Medida: producto.Medida,
      CantidadEsperada: 0,
      CantidadRecibida: 0,
      Subtotal: producto.Precio,
    };
    return nuevoProducto;
  };

  const actualizarProductosAgregados = (newProducto) => {
    console.log(productosAgregados);
    if (productosAgregados){
      setProductosAgregados([...productosAgregados, newProducto]);
    }else{
      setProductosAgregados([...[], newProducto]);
    }
    toast.success("Producto Agregado");
  };

  const handleClick = (event, producto) => {
    debugger
    const newProducto = crearNuevoProducto(producto);
    actualizarProductosAgregados(newProducto);
    onRequestClose();
  };


  const buscarProductos = async (term) => {

    if (!term) {
      return;
    } else {
      const data = await searchProduct(term);
      setSearchResult(data);
    }
  };

  return (
    <div>
     {/*Agregar boton para registrar nuevos productos que no existen en base de datos*/}
      <Buscador setSearchTerm={setSearchTerm}
                placeholder={"Buscar Productos"} />
      <TablaProductosEnRecepcion
        searchResult={searchResult}
        handleClick={handleClick}
      />
    </div>
  );
}

export default ModalRecepcion;

