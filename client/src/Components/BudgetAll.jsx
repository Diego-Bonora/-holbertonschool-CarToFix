import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import DataBox from './DataBox';
import ButtonService from './ButtonService';
import Searchbar from './Searchbar';
import axios from 'axios';
import FilterActive from './filterActive';
import { useNavigate } from 'react-router-dom';

export default function BudgetAll() {

	const navigate = useNavigate();
	const onRedirect = (path) => {
		console.log('redireccion', path);
		navigate(path);
	}

	const columns = ['plate', 'created_at', 'price'];
	const [BudgetData, setBudgetData] = useState([]);
	const [serviceData, setServiceData] = useState([]);

	const baseURL = 'http://127.0.0.1:5000';
	const usrId = '27c240b9-aac5-44d3-acf4-8a87858aac52';

	useEffect(() => {
		console.log('resd');
		axios.get(`${baseURL}/api/v1/budget/user/${usrId}`)
			.then((res) => {
				console.log('presupuesto', res.data);
				const filteredBudget = res.data.map(item => {
					const budgetofid = item.services.find(budget => budget.budget_id);
					const BudgetId = budgetofid ? budgetofid.budget_id : null;
					return {
						plate: item.vehicle.plate,
						price: item.total,
						created_at: item.created,
						vehicle_type: item.vehicle_type,
						budget_id: BudgetId,
					};
				})
				setBudgetData(filteredBudget);
				setServiceData(filteredBudget)
				console.log('filtro', filteredBudget);

			})
	}, [usrId])

	{/*Search*/ }
	const [searchQuery, setSearchQuery] = useState('');
	const handleSearch = (query) => {
		setSearchQuery(query);
	};
	{/*filter buscador*/ }
	const filterData = BudgetData.filter((vehicle) => {
		return vehicle.plate.toLowerCase().includes(searchQuery.toLowerCase()); {/* toLowerCase: para minusculas y mayusculas*/ }
	});

	const handleButton = (id) => {
		console.log(`boton: ${id}`)
		navigate(`/specificbudget/${id}`);
	}

	return (
		<>
			<div className='w-screen h-screen bg-page_background'>
				<NavBar />
				<div className='lg:mr-80 mr-marg-1 lg:ml-marg-4 ml-marg-1 mt-24 font-bold text-black flex items-center justify-between'>
					<h1 className='text-6xl font-black'>Presupuestos</h1>
					<div className='flex-1 flex items-center space-x-4 justify-end'>
						<Searchbar onSearch={handleSearch} />
					</div>
				</div>
				{/* info del historial */}
				<div className='bg-tabla_service items-center md:h-info_history xl:info_history_3 h-info_history_2 lg:mr-marg-5 mr-marg-1 lg:ml-marg-4 ml-marg-1 mt-marg-3 flex flex-wrap rounded-lg justify-items-center justify-center shadow-md shadow-gray-300 h-30'>
					<div className='overflow-y-scroll h-full w-full ml-9'>
						<DataBox columns={columns} info={searchQuery ? filterData : BudgetData}
							SeeClick={handleButton} IdName='budget_id'
							onRedirect={onRedirect} />
					</div>
					<ButtonService />
				</div>
			</div>
		</>

	)
}