import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import DataBoxBudget from './DataBoxBudget';
import ButtonService from './ButtonService';
import TypeVehicleIcons from './TypeVehicleIcons';
import Searchbar from './Searchbar';
import axios from 'axios';
import FilterActive from './filterActive';
import { useNavigate } from 'react-router-dom';
import { FaTh } from 'react-icons/fa';

export default function BudgetAll() {
  const navigate = useNavigate();
  const onRedirect = (path) => {
    console.log('redireccion', path);
    navigate(path);
  }

  const columns = ['plate', 'created_at', 'price'];
  const columnsName = {
    plate: 'Matrícula',
    created_at: 'Fecha de ingreso',
    price: 'Precio',
  }
  const [BudgetData, setBudgetData] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const baseURL = 'http://127.0.0.1:5000';
  const usrId = JSON.parse(localStorage.getItem('userID'));

  useEffect(() => {
    axios.get(`${baseURL}/api/v1/budget/user/${usrId}`)
      .then((res) => {
        const filteredBudget = res.data.map(item => {
          const doneStatus = item.services.some(service => service.done);
          return {
            plate: item.vehicle.plate,
            price: item.total,
            created_at: item.created,
            vehicle_type: item.vehicle_type,
            budget_id: item.id,
            done: doneStatus,
          };
        });
        setBudgetData(filteredBudget);
        console.log('filterdBudget', filteredBudget);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [usrId]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (event) => {
    const value = event.target.value;
    setActiveFilter(value);
  };

  const filteredData = activeFilter === 'all'
    ? BudgetData
    : BudgetData.filter(item => item.done === (activeFilter === 'true'));

  const filteredAndSearchedData = filteredData.filter((vehicle) => {
    return vehicle.plate.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleButton = (id) => {
    console.log(`boton: ${id}`)
    navigate(`/specificbudget/${id}`);
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
        <div className='mr-marg-1 lg:ml-marg-4 ml-marg-1 mt-14 font-bold text-black flex items-center justify-between'>
          <h1 className='lg:text-7xl text-5xl font-black'>Presupuestos</h1>
          <div className='flex-1 flex items-center space-x-4 justify-end'>
            <Searchbar onSearch={handleSearch} />
            <FilterActive activeFilter={activeFilter} handleFilterChange={handleFilterChange} />
            <FaTh className='text-2xl' />
          </div>
        </div>
        <div className='bg-tabla_service items-center lg:h-info_history h-info_history_2 lg:mr-marg-5 mr-marg-1 lg:ml-marg-4 ml-marg-1 mt-marg-1 md:mt-marg-3 flex flex-wrap rounded-lg justify-items-center justify-center shadow-md shadow-gray-300 h-30'>
          {filteredAndSearchedData.length === 0 ? (
            <div className="text-center text-gray-500 my-8 mx-2.25rem">
              <h2 className="text-xl font-bold">No hay datos disponibles</h2>
            </div>
          ) : (
            <div className='hover:overflow-y-scroll overflow-x-hidden h-full w-full ml-14'>
              <DataBoxBudget
                columns={columns}
                info={filteredAndSearchedData}
                SeeClick={handleButton}
                IdName='budget_id'
                onRedirect={onRedirect}
                columnsName={columnsName} //nombres originales de la tabla
                renderCell={(column, rowData) => {
                  if (column === 'plate') {
                    const typeIcon = <TypeVehicleIcons TypeVehicle={rowData.vehicle_type} />;
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