import React, { useState, useContext, useEffect } from 'react';
import { BuscadorProductos } from './buscadorProductos';
import { TablaProductos } from './tablaProducto'


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
        buscarProductos(searchTerm);
    }, [searchTerm]);

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };


    return (
        <div>
            <BuscadorProductos handleChange={handleChange}
                setSearchTerm={setSearchTerm} />
            <TablaProductos productos={productos}
                handleClick={handleClick}
                cantidad={cantidad} />
            <button
                type="button"
                onClick={() => handleAgregarProducto()}
            >
                Agregar al carrito
            </button>
        </div>
    );
};

export default ModalProducto;