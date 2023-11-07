import React from 'react';
import NavBar from './NavBar';
import DataBox from './DataBox';
import ButtonService from './ButtonService';
import {FaTh} from 'react-icons/fa';
import axios from 'axios';
import FilterActive from './filterActive';

export default function AllBudget() {

  const columns = []
    return (
		<>
        <div className='w-screen h-screen bg-page_background'>
            <NavBar />
            <div className='lg:mr-80 mr-marg-1 lg:ml-marg-4 ml-marg-1 mt-20 font-bold text-black flex items-center justify-between'>
          <h1 className='text-7xl'>Presupuestos</h1>
          <div className='flex-1 flex items-center space-x-4 justify-end'>
            <FaTh className='text-3xl' />
          </div>
          </div>
            {/* info del historial */}
            <div className='bg-tabla_service items-center lg:h-info_history h-info_history_2 lg:mr-marg-5 mr-marg-1 lg:ml-marg-4 ml-marg-1 mt-marg-3 flex flex-wrap rounded-lg justify-items-center justify-center shadow-md shadow-gray-300 h-30'>
            <div className='overflow-y-scroll h-full w-full ml-9'>
                <DataBox columns={columns} info={data}/>
              </div>
            <ButtonService/>
            </div>
        </div>
		</>

	)
}