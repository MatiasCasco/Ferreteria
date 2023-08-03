import React from "react";

const BarraBusqueda = ({
  onSearch,
  searchTerm,
}) => {
  const handleChange = (event) => {
    const searchTerm = event.target.value;
    onSearch(searchTerm);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleChange}
      />
    </div>
  );
};

export default BarraBusqueda;

/*import React from "react";

const BarraBusqueda = ({
  products,
  onSearch,
  searchTerm,
}) => {
  const handleChange = (event) => {
    const searchTerm = event.target.value;
    onSearch(searchTerm);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleChange}
      />
    </div>
  );
};

export default BarraBusqueda;*/