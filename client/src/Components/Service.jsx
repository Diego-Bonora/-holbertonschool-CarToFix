import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import DataBox from './DataBox';
import ButtonService from './ButtonService';
import FilterService from './FilterService';
import { FaTh } from 'react-icons/fa';
import axios from 'axios';

export default function VehicleHistory() {
  const columns = ['vehPlate', 'title', 'created'];
  const [serviceData, setServiceData] = useState([]); {/* datos de los servicios*/}
  const [typeservice, settypeService] = useState([]); {/*  por tipo */}
  const [Initial, setInitial] = useState(); {/*  copia de los datos */}
  const [selectedType, setSelectedType] = useState(''); {/* para el filtro y el tipo de servicio que se selecciona*/}

  const usrId = '74292fde-f738-454e-88ef-ab59818d2ba3';
  const baseURL = 'http://127.0.0.1:5000';

  useEffect(() => {
    axios.get(`${baseURL}/api/v1/service/user/${usrId}`)
      .then((res) => {
        console.log('respuesta', res.data);
        const filteredData = res.data.map(item => ({
          vehPlate: item.vehPlate,
          title: item.title,
          created: item.created,
        }));
        setServiceData(filteredData);
        setInitial(filteredData); {/* guarda la copia */}
        console.log('servicios', filteredData);

        const uniqueTypes = ['Tipo de servicio',...Array.from(new Set(filteredData.map(item => item.title)))];
        settypeService(uniqueTypes);
        console.log('tipos de servicio', uniqueTypes);
      })
      .catch((error) => {
        console.error('Error', error);
      });
  }, [usrId]);

  const filterByType = (selectedType) => {
    setSelectedType(selectedType);

    if (selectedType === 'Tipo de servicio') {
      setServiceData(Initial);
    } else {
      const filteredServiceData = Initial.filter(item => item.title === selectedType);
      setServiceData(filteredServiceData);
    }
  };

  return (
    <>
      <div className='w-screen h-screen bg-page_background'>
        <NavBar />
        <div className='lg:mr-80 mr-marg-1 lg:ml-marg-4 ml-marg-1 mt-24 font-bold text-black flex items-center justify-between'>
          <h1 className='text-7xl'>Servicios</h1>
          <div className='flex-1 flex items-center space-x-4 justify-end'>
            <FilterService typeservice={typeservice} filterByType={filterByType} selectedType={selectedType} classname="md:w-full w-2/5"/>
            <FaTh className='h-7'/>
          </div>
        </div>
        {/* info del historial */}
        <div className='bg-tabla_service items-center md:h-info_history xl:info_history_3 h-info_history_2 lg:mr-marg-5 mr-marg-1 lg:ml-marg-4 ml-marg-1 mt-marg-3 flex flex-wrap rounded-lg justify-items-center justify-center shadow-md shadow-gray-300 h-30'>
          <div className='overflow-y-scroll h-full w-full ml-9'>
            <DataBox columns={columns} info={serviceData} />
          </div>
          <ButtonService />
        </div>
      </div>
    </>
  );
}
