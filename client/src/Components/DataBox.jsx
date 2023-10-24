/* eslint-disable react/prop-types */
/* eslint-disable react/no-children-prop */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import Button from './button';

export default function DataBox({info, columns }) {

	return (
  <div className=''>
    <table className='text-black my-5 w-full'>
      <div className='header-div bg-gris-footer m-1 '>
      <thead>
        <tr>
          {columns.map((columns, index) => (
            <th key={index} className='px-3 ' >{columns} </th>
          ))}
        </tr>
      </thead>
      </div>
      <tbody className='w-9/12'>
        {info.map((i, index) => {
          return (
            <div key={index} className="row-div bg-gris-footer rounded-lg m-1">
              <tr className="text-black">
                {/* Recorre cada nombre de columna uno por uno" */}
                {columns.map((column, indexcol) => (
                  <td key={indexcol} className="px-5">
                    {i[column]} {/* Muestra el valor que debe ir según el nombre de la columna */}
                  </td>
                ))}
                <td className="px-5 py-15">
                  <Button children="ver" color="orange" size="mini" />
                </td>
              </tr>
            </div>
          );
        })}
      </tbody>
    </table>
  </div>
	);
}
