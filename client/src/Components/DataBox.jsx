/* eslint-disable react/prop-types */
/* eslint-disable react/no-children-prop */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import Button from './button';


export default function DataBox({info, columns }) {

	return (
  <div className='w-full'>
    <table className='text-black my-5 w-full'>
      <div className='header-div bg-gris-footer rounded-lg m-0.5 my-2.5 w-list'>
      <thead>
        <tr className='w-list'>
          {columns.map((columns, index) => (
            <th key={index} className='p-3  align-middle border-l flex-row justify-around w-1/2' >
              <div className='w-full'>{columns}</div>
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
                <div  className="row-div bg-gris-footer rounded-lg m-0.5 w-list">
                {columns.map((column, indexcol) => (
                  <td key={indexcol} className="p-2 px-8 align-middle border-l">
                    {i[column]} {/* Muestra el valor que debe ir según el nombre de la columna */}
                  </td>
                ))}
                </div>
                <div className='flex justify-end gap-4 w-10 ml-10'>
                <td>
                  <Button children="ver" color="orange" size="mini" />
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