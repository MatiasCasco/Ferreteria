import React from "react";
const Tablacrud = ({
  products,
  actions,
  attributes,
  editColumn,
  deleteColumn,
  onDelete,
  onUpdate,
}) => {
  // Break into the component here
  debugger;

  const rows = products.map((product, index) => (
    <tr key={index}>
      {attributes.map((attribute) => (
        <td key={attribute}>{product[attribute]}</td>
      ))}
      {editColumn && (
        <td><button onClick={() => onUpdate(product)}>Update</button></td>
      )}
      {deleteColumn && (
        <td><button onClick={() => onDelete(product)}>Delete</button></td>
      )}
    </tr>
  ));

  return (
    <table>
      <thead>
        <tr>
          {attributes.map((attribute) => (
            <th key={attribute}>{attribute}</th>
          ))}
          {editColumn && <th>Update</th>}
          {deleteColumn && <th>Delete</th>}
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  );
};

export default Tablacrud;