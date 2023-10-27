/* eslint-disable react/prop-types */
import React from 'react';
import Button from './button';

export default function DataBox({ info, columns }) {
  return (
    <table className="text-black my-5 w-full ">
      <thead>
        <tr className="w-screen bg-gris-footer border-b-8 border-t-10 border-r-1">
          {columns.map((column, index) => (
            <th
              key={index}
              className={`p-3 align-middle border-l flex-row justify-around text-lg
                ${index === 0 ? 'rounded-tl-2xl rounded-bl-2xl' : index === columns.length - 1 ? 'rounded-tr-2xl rounded-br-2xl' : ''}`}
            >
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {info.map((data, index) => (
          <tr
            key={index}
            className=" border-4 border-r-1"
          >
            {columns.map((column, indexcol) => (
              <td
                key={indexcol}
                className={`p-2 sm:px-8 px-5 align-middle border-l text-md 
                ${indexcol === 0 ? 'rounded-tl-2xl rounded-bl-2xl bg-gris-footer' : indexcol === columns.length - 1 ? 'rounded-tr-2xl rounded-br-2xl bg-gris-footer' : ''} 
                ${indexcol === Math.floor(columns.length / 2) ? 'bg-gris-footer' : ''}`}
              >
                {data[column]}
              </td>
            ))}
            <td className="p-2 sm:px-8 px-5 align-middle border-l text-md bg-opacity-0">
              <button type="button" className="bg-orange-claro hover:bg-orange-oscuro text-white p-px md:w-14 w-10 items-center">
                Ver
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
