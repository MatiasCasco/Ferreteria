import React from 'react';


const TablaProductos = ({ productos, handleClick, cantidad }) => {
    return (
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
          {productos.map((producto) => (
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
    );
  };

export default TablaProductos;