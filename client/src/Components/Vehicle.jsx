import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import DataBox from './DataBox';
import ButtonService from './ButtonService';
import Searchbar from './Searchbar';
import TypeVehicleIcons from './TypeVehicleIcons';
import { FaTh } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

export default function Vehicle() {

  const navigate = useNavigate();
  const onRedirect = (path) => {
    console.log('redireccion', path);
    navigate(path);
  }

  {/* column for databox*/ }
  const vehiclecolumn = ['plate', 'title', 'created_at'];
  const columnsName = {
    plate: 'Matriculas',
    title: 'Servicios',
    created_at: 'Última modificación',
  }
  console.log('nombres', columnsName);
  const baseURL = 'http://127.0.0.1:5000'
  const [VehicleData, setVehicleData] = useState([]);

  const usrId = JSON.parse(localStorage.getItem('userID'));

  const truncateServicesTitles = (arr, lNum) => {
    if (arr) {

      let stringedArray = arr.join(', ');
      if (stringedArray.length > lNum) {
        stringedArray = stringedArray.slice(0, lNum) + '...';
      }
      return stringedArray
    } else { return "sin servios" }
  }

  useEffect(() => {
    axios.get(`${baseURL}/api/v1/vehicle/user/${usrId}`)
      .then((res) => {
        console.log('datos compretos', res.data);
        const dataofvehicle = res.data.map(vehicle => {
          const budgetWithVehicleId = vehicle.budgets.find(budget => budget.vehicle_id);
          const vehicleId = budgetWithVehicleId ? budgetWithVehicleId.vehicle_id : null;
          return {
            plate: vehicle.plate,
            created_at: format(new Date(vehicle.created_at), 'dd/MM/yyyy'),
            title: truncateServicesTitles(vehicle.services.map((service) => service.title), 20),
            vehicle_id: vehicleId,
            type: vehicle.type,
          };
        });
        setVehicleData(dataofvehicle)
        console.log('tabla', dataofvehicle);
      })
      .catch(error => {
        console.error('Error', error);
      });
  }, [usrId])

  {/*Search*/ }
  const [searchQuery, setSearchQuery] = useState('');
  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  {/*filter*/ }
  const filterData = VehicleData.filter((vehicle) => {
    return vehicle.plate.toLowerCase().includes(searchQuery.toLowerCase()); {/* toLowerCase: para minusculas y mayusculas*/ }
  });

  const handleButton = (id) => {
    console.log(`boton: ${id}`)
    navigate(`/details/${id}`);
  }
  const handleLogOut = () => {
    console.log("entro")
    localStorage.removeItem('userID')
    window.location.href = "/";
  }
  return (
    <>
      <div className='w-screen h-screen bg-page_background'>
        <NavBar logOut={handleLogOut} />
        <div className='mr-marg-1 lg:ml-marg-4 ml-marg-1 md:mt-20 mt-16 font-bold text-black flex items-center justify-between'>
          <h1 className='text-7xl font-black'>Vehículos</h1>
          <div className='flex-1 flex items-center space-x-4 justify-end'>
            <Searchbar onSearch={handleSearch} />
            <FaTh className='text-2xl' />
          </div>
        </div>
        {/* info del historial */}
        <div className='bg-tabla_service items-center lg:h-info_history h-info_history_2 lg:mr-marg-5 mr-marg-1 lg:ml-marg-4 ml-marg-1 mt-marg-3 flex flex-wrap rounded-lg justify-items-center justify-center shadow-md shadow-gray-300 h-30'>
          {VehicleData.length === 0 ? (
            <div className="text-center text-gray-500 my-8 mx-2.25rem">
              <h2 className="text-xl font-bold">No hay datos disponibles</h2>
            </div>
          ) : (
            <div className='overflow-y-scroll h-full w-full ml-14'>
              <DataBox
                columns={vehiclecolumn}
                info={searchQuery ? filterData : VehicleData}
                SeeClick={handleButton}
                IdName='vehicle_id'
                onRedirect={onRedirect}
                columnsName={columnsName}
                renderCell={(column, rowData) => {
                  if (column === 'plate') {
                    const typeIcon = <TypeVehicleIcons TypeVehicle={rowData.type} />;
                    return (
                      <div className="flex items-center">
                        {typeIcon}
                        <span className="ml-4">{rowData[column]}</span>
                      </div>
                    );
                  }
                  return rowData[column];
                }}
              />
            </div>
          )}

          <ButtonService />
        </div>
      </div>
    </>

  )
}