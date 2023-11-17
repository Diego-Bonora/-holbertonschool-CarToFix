import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import DataBox from './DataBox';
import ButtonService from './ButtonService';
import FilterService from './FilterService';
import TypeVehicleIcons from './TypeVehicleIcons';
import { FaTh } from 'react-icons/fa';
import axios from 'axios';
import FilterActive from './filterActive';
import { useNavigate } from 'react-router-dom';

export default function Services() {

  const navigate = useNavigate();
  const onRedirect = (path) => {
    console.log('redireccion', path);
    navigate(path);
  }

  const columns = ['vehPlate', 'title', 'created'];
  const columnsName = {
    vehPlate: 'Matriculas',
    title: 'Servicios',
    created: 'Última modificación',
  }
  const [serviceData, setServiceData] = useState([]); {/* datos de los servicios*/ }
  const [typeservice, settypeService] = useState([]); {/*  por tipo */ }
  const [Initial, setInitial] = useState(); {/*  copia de los datos */ }
  const [selectedType, setSelectedType] = useState(''); {/* para el filtro y el tipo de servicio que se selecciona*/ }

  const [activeFilter, setActiveFilter] = useState('all'); // Filtro para servicios activos o no activos
  let filteredServiceData;

  const usrId = JSON.parse(localStorage.getItem('userID'));
  const baseURL = 'http://127.0.0.1:5000';

  useEffect(() => {
    axios.get(`${baseURL}/api/v1/service/user/${usrId}`)
      .then((res) => {
        console.log('respuesta', res.data);
        const filteredData = res.data.map(item => ({
          vehPlate: item.vehPlate,
          title: item.title,
          created: item.created,
          active: item.active,
          vehId: item.vehId,
          vehType: item.vehType,
        }));

        setServiceData(filteredData);
        setInitial(filteredData); {/* Guarda la copia */ }

        console.log('Servicios', filteredData);

        {/*tipo de servicio*/ }
        const uniqueTypes = ['Tipo de servicio', ...Array.from(new Set(filteredData.map(item => item.title)))];
        settypeService(uniqueTypes);
        console.log('tipos de servicio', uniqueTypes);
      })
      .catch((error) => {
        console.error('Error', error);
      });
  }, [usrId]);

  {/*POR SERVICIO*/ }
  const filterByType = (selectedType) => {
    setSelectedType(selectedType);

    if (selectedType === 'Tipo de servicio') {
      setServiceData(Initial);
    } else {
      const filteredServiceData = Initial.filter(item => item.title === selectedType);
      setServiceData(filteredServiceData);
    }
  };

  {/* filtro para que cambie de acttivo a finalizdo*/ }
  const handleFilterChange = (event) => {
    setActiveFilter(event.target.value);
  };

  {/* por estado */ }
  if (activeFilter === 'all') {
    filteredServiceData = serviceData;
    console.log('activefilter', activeFilter);
  } else {
    console.log('budgetfilter', filteredServiceData);
    filteredServiceData = serviceData.filter(item => item.active === (activeFilter === 'true'));
  }


  const handleButton = (id) => {
    console.log(`boton: ${id}`)
    navigate(`/details/${id}`);
  }


  return (
    <>
      <div className='w-screen h-screen bg-page_background'>
        <NavBar />
        <div className='mr-marg-1 lg:ml-marg-4 ml-marg-1 mt-16 font-bold text-black flex items-center justify-between'>
          <h1 className='text-7xl font-black'>Servicios</h1>
          <div className='flex-1 flex h-20 items-center space-x-4 justify-end'>
            <FilterActive activeFilter={activeFilter} handleFilterChange={handleFilterChange} />
            <FilterService typeservice={typeservice} filterByType={filterByType} selectedType={selectedType} classname="md:w-full w-2/5" />
            <FaTh className='text-2xl' />
          </div>
        </div>
        {/* Info del historial */}
        <div className='bg-tabla_service items-center lg:h-info_history h-info_history_2 lg:mr-marg-5 mr-marg-1 lg:ml-marg-4 ml-marg-1 mt-marg-3 flex flex-wrap rounded-lg justify-items-center justify-center shadow-md shadow-gray-300 h-30'>
          {filteredServiceData.length === 0 ? (
            <div className="text-center text-gray-500 my-8 mx-2.25rem">
              <h2 className="text-xl font-bold">No hay datos disponibles</h2>
            </div>
          ) : (
            <div className='hover:overflow-y-scroll overflow-x-hidden h-full w-full ml-14'>
              <DataBox columns={columns} info={filteredServiceData}
                SeeClick={handleButton} IdName='vehId'
                onRedirect={onRedirect}
                columnsName={columnsName}
                renderCell={(column, rowData) => {
                  if (column === 'vehPlate') {
                    const typeIcon = <TypeVehicleIcons TypeVehicle={rowData.vehType} />;
                    return (
                      <div className="flex items-center">
                        {typeIcon}
                        <span className="ml-4">{rowData[column]}</span>
                      </div>
                    );
                  }
                  return rowData[column];
                }} />
            </div>
          )}

          <ButtonService />
        </div>
      </div>
    </>
  );
}