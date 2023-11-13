import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import DataBox from './DataBox';
import ButtonService from './ButtonService';
import Searchbar from './Searchbar';
import { FaTh } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
	const baseURL = 'http://127.0.0.1:5000'
	const [VehicleData, setVehicleData] = useState([]);

	const usrId = 'ca2841f8-0773-4b09-b944-1947e9913803';

	const truncateServicesTitles = (arr, lNum) => {
		if (arr) {

			let stringedArray = arr.join()
			if (stringedArray.length > lNum) {
				return stringedArray.slice(0, lNum) + '... '
			}
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
						created_at: vehicle.created_at,
						title: truncateServicesTitles(vehicle.services.map((service) => service.title), 20),
						vehicle_id: vehicleId,
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

	return (
		<>
			<div className='w-screen h-screen bg-page_background'>
				<NavBar />
				<div className='lg:mr-80 mr-marg-1 lg:ml-marg-4 ml-marg-1 mt-20 font-bold text-black flex items-center justify-between'>
					<h1 className='text-7xl font-black'>Vehículos</h1>
					<div className='flex-1 flex items-center space-x-4 justify-end'>
						<Searchbar onSearch={handleSearch} />
						<FaTh className='text-3xl' />
					</div>
				</div>
				{/* info del historial */}
				<div className='bg-tabla_service items-center lg:h-info_history h-info_history_2 lg:mr-marg-5 mr-marg-1 lg:ml-marg-4 ml-marg-1 mt-marg-3 flex flex-wrap rounded-lg justify-items-center justify-center shadow-md shadow-gray-300 h-30'>
					{VehicleData.length === 0 ? (
						<div className="text-center text-gray-500 my-8 mx-2.25rem">
							<h2 className="text-xl font-bold">No hay datos disponibles</h2>
						</div>
					) : (
						<div className='overflow-y-scroll h-full w-full ml-9'>
							<DataBox columns={vehiclecolumn} info={searchQuery ? filterData : VehicleData}
								SeeClick={handleButton} IdName='vehicle_id'
								onRedirect={onRedirect}
								columnsName={columnsName} />
						</div>
					)}

					<ButtonService />
				</div>
			</div>
		</>

	)
}