import React from 'react';

const TablaProductos = ({ searchResult, handleCantChange, handleClick, cantidad }) => {
  const isButtonDisabled = (producto) => {
    return cantidad[producto.Id] === 0 || cantidad[producto.Id] === undefined || cantidad[producto.Id] === '';
  };
   /** Id, Nombre, Iva, Medida, Marca,Categoria, Precio */
  return (
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th style={{ width: '13%' }}>IVA</th>
          <th style={{ width: '13%' }}>Medida</th>
          <th style={{ width: '20%' }}>Categoria</th>
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
            <td style={{ textAlign: 'center' }}>{producto.Categoria}</td>
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