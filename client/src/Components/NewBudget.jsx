import React from 'react'
import { useEffect } from 'react';
import Button from './button'
import ServiceItem from './ServiceItem';
import { useState } from "react";
import Creatable from 'react-select/creatable';
import { useNavigate } from 'react-router-dom';
import MessageZone from './MessageZone';
import axios from "axios"




export default function NewBudget({ checkPlateRegistration, actualClient }) {

	let userId = 'bc625955-0b33-4eec-837f-110619845a6c'


	let baseURL = 'http://127.0.0.1:5000/'

	const navigate = useNavigate();

	const today = new Date();

	{/* FoState for budget */ }

	const [budget, setBudget] = useState([]);

	{/* Form data state */ }

	const [formData, setFormData] = useState({ plate: "", title: "", name: "", description: "", asignedTo: "", price: 0 });

	{/* items to show at budget resume */ }

	const [items, setItems] = useState([])

	{/* State for searching the vehicle Plate */ }

	const [plate, setPlate] = useState('')





	{/* reads the form  */ }

	const handleChange = (event) => {
		event.preventDefault();
		const { name, value } = event.target;
		setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));

	};



	useEffect(() => {
		setPlate((formData.plate).toUpperCase())
		console.log("typed plate", plate)
		localStorage.setItem('plate', plate);
	}, [formData.plate])

	{/* Total price of budget */ }

	const [total, setTotal] = useState(0.00)

	const getTotal = () => {
		return (
			items.reduce((total, p) => total = total + p.price, 0)
		)
	}


	{/* Each item of the resume  */ }



	const handleSubmit = (event) => {
		event.preventDefault();
		setTotal(() => {
			getTotal();
		})
		setItems(current => [...current, {
			plate: event.target.plate.value,
			name: titleValue.label,
			price: parseInt(event.target.price.value),
			description: event.target.description.value,
			asignedTo: workersValue.label
		}])

	};


	const handeleFinalSubmit = (event) => {
		event.preventDefault();
		setBudget(
			{
				user_id: userId,
				client_id: actualVehicle.id,
				total_price: total,
				payment_method: event.target.installments.value ? "CREDITO" : "EFECTIVO",
				installments: event.target.installments.value,
				warranty: "agregar",
				vehicle_id: localStorage.getItem('vehicle_id'),
				issue_date: today,
				due_date: event.target.due_date.value,
				confirmed: confirmed,
				services: items,
			}
		);
		console.log("budget to post ", budget)
		if (confirmed) {
			console.log("Presupuesto Guardado")
			submited = true;
		}
		else {
			axios.post(`${baseURL}/api/v1/budget`, JSON.stringify(budget), {
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				}
			})
				.then(function (response) {
					console.log("from create budget", response);
					console.log('Presupuesto Enviado por mail pendiente de confirmacon');
					submited = true;


				})
				.catch(function (error) {
					console.log(error);
				});

		}

	}


	{/* console services continuosly */ }

	useEffect(() => {
		console.log('items', items)
		setTotal(items.reduce((total, p) => total = total + p.price, 0))
	}, [items])

	{/* launcher for finished budget */ }

	useEffect(() => {
		console.log("Budget has change to save ", budget)
	}, [budget])

	{/* Var to indicate if budget is confirmed */ }

	let confirmed = true;

	{/* Options for  titles  */ }

	const titles = [
		{ label: 'Electricidad', value: 1 },
		{ label: 'Mecanica', value: 2 },
		{ label: 'Chapa', value: 3 },
		{ label: 'Aire', value: 4 },
	]

	{/* Options for  services   */ }
	const services = [
		{ label: 'Revicion general', value: 1 },
		{ label: 'Falla', value: 2 },
		{ label: 'A nuevo', value: 3 },
		{ label: 'Cambio', value: 4 },
	]

	{/* Options for  services   */ }

	const workers = [
		{ label: 'Tony Stark', value: 1 },
		{ label: 'Rick Sanchez', value: 2 },
		{ label: 'Maluma', value: 3 },
		{ label: 'El Duki', value: 4 },
	]

	{/* States for selects values    */ }

	const [titleValue, setTitleValue] = useState('');
	const [serviceValue, setServiceValue] = useState('');
	const [workersValue, setWorkersValue] = useState('');
	const [actualVehicle, setActualvehicle] = useState([])

	{/* Hadlers  for selects values    */ }

	const handleTitleChange = (field, value) => {
		switch (field) {
			case 'titles':
				setTitleValue(value)
				break
			default:
				break
		}
	}
	const handleServiceChange = (field, value) => {
		switch (field) {
			case 'services':
				setServiceValue(value)
				break
			default:
				break
		}
	}
	const handleWorkersChange = (field, value) => {
		switch (field) {
			case 'workers':
				setWorkersValue(value)
				break
			default:
				break
		}
	}

	{/* Función para borrar servicios del state    */ }

	const removeService = (index) => {
		console.log('index', index)
		setItems((prevList) => {
			const newList = [...prevList];
			newList.splice(index, 1);
			console.log('nueva lista de items', newList);
			return newList;
		});
	};

	{/* Exit method on Cancelar Button   */ }

	const abortBudget = () => {
		setItems([]);
		console.log("items reseteado", items);
		console.log('saliste de NewBudget');
		navigate('/home');

	}

	useEffect(() => {
		setTotal(getTotal())
	}, [items])

	const [messageMode, setMessageMode] = useState("none")


	return (
		<>
			<div className='w-screen bg-[rgb(245,245,245)] h-screen overflow-scroll  px-20   text-black'>
				<h1 className=' font-black mt-5'>Nuevo Presupuesto</h1>
				<section className='principalFrames grid grid-flow-col grid-rows-3 gap-4 mt-10 justify-items-center'>
					<section className='CreateBudget p-4 w-full  bg-[#EBEBEB] rounded-lg row-span-4 col-span-2 h-fit'>
						<form className='FormToCreateBudget' onSubmit={handleSubmit} onChange={handleChange}>
							{/* elements of the form */}
							{/* MATRICULA */}
							<div className='flex flex-col-2 justify-between'>
								<label className="text-2xl font-black mr-5" for="plate">Matricula</label>

								<div className='flex flex-row-reverse w-1/2'>
									<input className='bg-[#B4D1D3] p-1 my-4 text-right w-1/2' type='text' id='plate' name="plate" value={formData.plate} placeholder='XXX-0000' onBlur={() => checkPlateRegistration(plate)}></input>
								</div>
							</div>
							{/* TITULO */}
							<div className='input flex flex-col-2 justify-between'>

								<label className="my-4" for="title">Título</label>
								<div className='flex flex-row-reverse w-full'>
									<Creatable className='w-3/5 mt-2'
										onChange={(value) => handleTitleChange('titles', value)}
										options={titles}
										placeholder='Agrega un título'
										value={titleValue}
										onFocus={checkPlateRegistration(plate)} />
								</div>
							</div>
							{/* SERVICIOS */}
							<div className='input flex flex-col-2 justify-between'>

								<label className="my-4" for="service">Servicio</label>
								<div className='flex flex-row-reverse w-full'>
									<div className='flex flex-row-reverse w-full'>
										<Creatable className='w-3/5 mt-2'
											onChange={(value) => handleServiceChange('services', value)}
											options={services}
											placeholder='Qué service se le hará al vehículo'
											value={serviceValue} />
									</div>
								</div>
							</div>

							{/* DESCRIPTION TEXTAREA */}
							<div className='flex flex-col-2 justify-between'>

								<label className="my-4" fot="description">Descripción</label>
								<div className='flex flex-row-reverse w-1/2'>
									<textarea className='bg-[#B4D1D3] p-1 my-4 ml-3' id="description" name="description" value={formData.description} onChange={handleChange} rows="5" cols="50" placeholder='Describe el servicio a realizar o la falla reportada'>

									</textarea>
								</div>
							</div>
							{/* ASIGNADO A */}
							<div className='flex flex-col-2 justify-between'>

								<label className="my-4" for="asignedTTo" >Asignado a</label>
								<div className='flex flex-row-reverse w-1/2'>
									<div className='flex flex-row-reverse w-full'>
										<Creatable className='w-full mt-2'
											onChange={(value) => handleWorkersChange('workers', value)}
											options={workers}
											placeholder='Tecnico'
											value={workersValue} />
									</div>
								</div>
							</div>
							{/* PRECIO */}
							<div className='flex flex-col-2 justify-between'>

								<label className="my-4" for="price">Precio</label>
								<div className='flex flex-row-reverse'>
									<input className='bg-[#B4D1D3] p-1 my-4 text-right w-1/2' type='text' name="price" value={formData.price} onChange={handleChange}></input>
								</div>
							</div>
							{/* BOTON AGREGAR */}
							<div className='flex flex-col-1 justify-end'>

								<button className='bg-teal-500 text-white' type='submit'> Agregar </button>
							</div>
						</form>

					</section>
					{/* RESUMEN DEL PRESUPUESTO */}
					{/* LISTA DE ITEMS AGREGADOS */}
					<section className='p-4 w-full min-h-[200px] border-[4px] border-[#B4D1D3] bg-[#EBEBEB] rounded-lg'>
						{items.map((i, index) => {
							return (<div>
								<ServiceItem item={i.name} price={i.price} key={index} removeService={() => removeService(index)} />
							</div>)
						})
						}


						<div className='flex flex-col-1 justify-end mt-5'>
							<Button children="Guardar" size="normal" color="orange" />
						</div>

					</section>
					{/* CUOTAS Y VIGENCIA - form  */}
					<section className='totals col-span-1 row-span-2 w-full'>
						<form id="FinalDataBudget" onSubmit={handeleFinalSubmit}>
							<div className='flex justify-between my-2'>
								<label className="p-2" for="due_date">Vigente hasta </label>
								<input className="bg-[#B4D1D3] p-2" type="date" id="due_date" name="due_date"></input>
							</div>
							<div className='flex justify-between my-2'>
								<label className="p-2" for="installments ">Cuotas </label>
								<input className='w-12 bg-[#B4D1D3] p-2' type="text" id="installments"></input>

							</div>
							{/* TOTALES */}
							<div className='flex justify-between my-2'>
								<span className='text-2xl font-black p-4'>TOTAL</span>
								<div className='text-2xl  grid justify-items-end font-black w-fit bg-[#B4D1D3]'>
									<p className='self-center mx-5 '>{items.reduce((total, p) => total = total + p.price, 0)}</p>
								</div>
							</div>

							{/* System Message Area  */}

							<MessageZone display={messageMode} text="Cuidado !!! " />


							{/* CANCELAR CONFIRMAR O ENVIAR  */}
							<div className='flex flex-col-2 justify-between space-x-2 mt-16'>
								<div onClick={abortBudget} >
									<button className='bg-orange-600 text-white  hover:bg-orange-800 font-bold py-2 px-4 rounded '>Cancelar</button>
								</div>
								<div className='flex space-x-4'>
									<button className='bg-orange-600 text-white  hover:bg-orange-800 font-bold py-2 px-4 rounded ' type='submit'>Confirmado</button>

									<button onClick={() => confirmed = false} className='bg-orange-600 text-white  hover:bg-orange-800 font-bold py-2 px-4 rounded ' type='submit'>Enviar</button>
								</div>


							</div>
						</form>

					</section>
				</section>
			</div >
		</>
	)
}
