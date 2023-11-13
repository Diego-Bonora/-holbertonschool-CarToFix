import React from "react";

export default function FilterActive({ activeFilter, handleFilterChange }) {
  return (
    <div>
      <select
        className="bg-tabla_service pl-2.5 pr-3 rounded-xl flex border border-gris-background h-8"
        value={activeFilter}
        onChange={handleFilterChange}
      >
        <option value="all">Por estado</option>
        <option value="true">Activos</option>
        <option value="false">Finalizados</option>
      </select>
    </div>
  );
}
