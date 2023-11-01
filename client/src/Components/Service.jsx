import React from 'react';
import NavBar from './NavBar';
import DataBox from './DataBox';
import ButtonService from './ButtonService';
import Searchbar from './Searchbar';
import {FaTh} from 'react-icons/fa';
import filter_type from './filter_per_type';


export default function Vehicle_history() {

  const columns = ['Matricula', 'Servicio', 'Ultima'];
  const data = [{ Matricula: 'ABC 4545', Servicio: 'Electricidad', Ultima: '03/12/2022'},
  { Matricula: 'ABC 4545', Servicio: 'Electricidad', Ultima: '03/12/2022'},
  { Matricula: 'ABC 4545', Servicio: 'Electricidad', Ultima: '03/12/2022'},
  { Matricula: 'ABC 4545', Servicio: 'Electricidad', Ultima: '03/12/2022'},
  { Matricula: 'ABC 4545', Servicio: 'Electricidad', Ultima: '03/12/2022'},
  { Matricula: 'ABC 4545', Servicio: 'Electricidad', Ultima: '03/12/2022'},
  { Matricula: 'ABC 4545', Servicio: 'Electricidad', Ultima: '03/12/2022'},
  { Matricula: 'ABC 4545', Servicio: 'Electricidad', Ultima: '03/12/2022'},
  { Matricula: 'ABC 4545', Servicio: 'Electricidad', Ultima: '03/12/2022'},];
    return (
		<>
        <div className='w-screen h-screen bg-page_background'>
            <NavBar />
            <div className='lg:mr-80 mr-marg-1 lg:ml-marg-4 ml-marg-1 mt-24 font-bold text-black flex items-center justify-between'>
              <h1 className='text-7xl'>Servicios</h1>
              <div className='flex-1 flex items-center space-x-4 justify-end'>



                <filter_type/>
              </div>
            </div>
          {/* info del historial */}
            <div className='bg-tabla_service items-center md:h-info_history xl:info_history_3 h-info_history_2 lg:mr-marg-5 mr-marg-1 lg:ml-marg-4 ml-marg-1 mt-marg-3 flex flex-wrap rounded-lg justify-items-center justify-center shadow-md shadow-gray-300 h-30'>
            <div className='overflow-y-scroll h-full w-full ml-9'>
                <DataBox columns={columns} info={data}/>
              </div>
            <ButtonService />
            </div>
        </div>
		</>

	)
}
