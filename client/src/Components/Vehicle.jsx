import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import DataBox from './DataBox';
import ButtonService from './ButtonService';
import Searchbar from './Searchbar';
import {FaTh} from 'react-icons/fa'
import axios from 'axios';


export default function Vehicle() {

    {/* column for databox*/}
    const vehiclecolumn = ['plate', 'services', 'created_at'];
    const baseURL = 'http://127.0.0.1:5000'
    const [VehicleData, setVehicleData] = useState([
      { plate: '', services: '', created_at: ''}
    ]);
    
    {/*get plate*/}
    useEffect(() => {
      axios.get(`${baseURL}/api/v1/vehicle`)
        .then((res) => {
          setVehicleData(Object.values(res.data))
          console.log(VehicleData);
        })
        .catch(error => {
          console.error('Error', error);
        });
    })
    {/*Search*/}
    const [searchQuery, setSearchQuery] = useState('');
    const handleSearch = (query) => {
      setSearchQuery(query);
    };
    {/*filter*/}
    const filterData = VehicleData.filter((vehicle) => {
      return vehicle.plate.toLowerCase().includes(searchQuery.toLowerCase()); {/* toLowerCase: para minusculas y mayusculas*/}
    });

    return (
		<>
        <div className='w-screen h-screen bg-page_background'>
            <NavBar />
            <div className='lg:mr-80 mr-marg-1 lg:ml-marg-4 ml-marg-1 mt-20 font-bold text-black flex items-center justify-between'>
          <h1 className='text-7xl'>Vehículos</h1>
          <div className='flex-1 flex items-center space-x-4 justify-end'>
            <Searchbar onSearch={handleSearch}/>
            <FaTh className='text-3xl' />
          </div>
          </div>
            {/* info del historial */}
            <div className='bg-tabla_service items-center lg:h-info_history h-info_history_2 lg:mr-marg-5 mr-marg-1 lg:ml-marg-4 ml-marg-1 mt-marg-3 flex flex-wrap rounded-lg justify-items-center justify-center shadow-md shadow-gray-300 h-30'>
            <div className='overflow-y-scroll h-full w-full ml-9'>
                <DataBox columns={vehiclecolumn} info={searchQuery ? filterData : VehicleData}/>
              </div>
            <ButtonService/>
            </div>
        </div>
		</>

	)
}
