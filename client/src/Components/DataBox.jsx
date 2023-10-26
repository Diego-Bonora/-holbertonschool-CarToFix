/* eslint-disable react/prop-types */
/* eslint-disable react/no-children-prop */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import Button from './button';

export default function DataBox({info, columns }) {
  
	return (
  <div className='w-full'>
    <table className='text-black my-5 w-full'>
      <div className='header-div bg-gris-footer rounded-lg m-0.5 my-2.5 sm:w-list w-list-1'>
      <thead>
        <tr className='w-screen'>
          {columns.map((columns, index) => (
            <th key={index} className='p-3 sm:px-11 px-8 align-middle border-l flex-row justify-around text-lg' >
              {columns}
              </th>
          ))}
        </tr>
      </thead>
      </div>
      <tbody>
        {info.map((i, index) => {
          return (
            
              <tr key={index} className="text-black flex flex-grow items-center">
                {/* Recorre cada nombre de columna uno por uno" */}
                <div  className="row-div bg-gris-footer rounded-lg m-0.5 sm:w-list w-list-1">
                {columns.map((column, indexcol) => (
                  <td key={indexcol} className="p-2 sm:px-8 px-5 align-middle border-l text-md">
                    {i[column]} {/* Muestra el valor que debe ir según el nombre de la columna */}
                  </td>
                ))}
                </div>
                <div className='flex justify-end gap-4 w-10 lg:ml-9 md:ml-7 ml-5'>
                <td>
                  <button type='' className='bg-orange-claro hover:bg-orange-oscuro text-white p-px md:w-14 w-10 items-center'>Ver</button>
                </td>
                </div>
              </tr>
            
          );
        })}
      </tbody>
    </table>
  </div>
	);
}