import React from "react";

export default function FilterService({ typeservice, filterByType, selectedType, classname }) {
  return (
    <div>
      <select
        className={`bg-tabla_service pl-2.5 pr-3 rounded-lg flex border border-gris-background ${classname}`}
        onChange={(e) => filterByType(e.target.value)}
        value={selectedType}>
        {typeservice.map((type, index) => (
          <option key={index} value={type}>
            {type}
          </option>
        ))}
      </select>
    </div>
  );
}
