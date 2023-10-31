import React from 'react';
import NavBar from './NavBar';
import DataBox from './DataBox';
import NewBudgetButton from './NewBudgetButton';
import Searchbar from './Searchbar';
import {FaTh} from 'react-icons/fa'


export default function Vehicle_history() {

  const columns = ['Ingreso', 'detalle'];
  const data = [{ Ingreso: '24/10/2022', detalle: 'Cambio de aceite hjsen jhndxecWUO HNDXEJKWHCI'},
  { Ingreso: '24/10/2022', detalle: 'Chequeo general dl condnsador de flujos'},
  { Ingreso: '24/10/2022', detalle: 'Revision de frenos', data: 'hdkjckf'},
	{ Ingreso: '24/10/2022', detalle: 'Electricidad', data: 'hdkjckf'},
	{ Ingreso: '24/10/2022', detalle: 'Tren delantero'},
  { Ingreso: '24/10/2022', detalle: 'Tren delantero'},
  { Ingreso: '24/10/2022', detalle: ''}];
    return (
		<>
        <div className='w-screen h-screen bg-page_background'>
            <NavBar />
            <div className='lg:mr-52 mr-marg-1 lg:ml-marg-4 ml-marg-1 mt-marg-3 font-bold text-black flex items-center justify-between'>
          <h1 className='flex-1'>Vehículos</h1>
          <div className='flex items-center space-x-4'>
            <Searchbar />
            <FaTh className='text-xl' />
          </div>
          </div>
            {/* info del historial */}
            <div className='bg-gris-background items-center lg:h-info_history h-info_history_2 lg:mr-marg-5 mr-marg-1 lg:ml-marg-4 ml-marg-1 mt-marg-3 flex flex-wrap rounded-lg justify-items-center justify-center shadow-md shadow-gray-300 h-30'>
            <div className='overflow-y-scroll h-full w-full ml-9'>
                <DataBox columns={columns} info={data}/>
              </div>
            <NewBudgetButton />
            </div>
        </div>
		</>

	)
}
