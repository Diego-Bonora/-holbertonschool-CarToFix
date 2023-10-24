import React from 'react'

import Button from './button'
import ServiceItem from './ServiceItem';
import { useState } from "react";
import Creatable from 'react-select/creatable'




export default function NewBudget() {

	{/* Form data state */ }

	const [formData, setFormData] = useState({ plate: "XXX - 0000", title: "", name: "", description: "", asignedTo: "", price: 0 });

	{/* items to show at budget resume */ }

	const [items, setItems] = useState([])

	{/* reads the form  */ }

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
	};



	{/* Each item of the resume  */ }

	const handleSubmit = (event) => {
		event.preventDefault();
		setItems(current => [...current, {
			plate: event.target.plate.value,
			name: titleValue.label,
			price: parseInt(event.target.price.value),
			description: event.target.description.value,
			asignedTo: workersValue.label
		}])

		console.log("items", items);
	};

	{/* Total price of budget */ }

	let total = 0;

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


	return (


		<div className='w-screen bg-[#F5F5F5] h-screen p-10 '>
			<h1 className=' font-black'>Nuevo Presupuesto</h1>
			<section className='principalFrames grid grid-flow-col grid-rows-3 gap-4 mt-10 justify-items-center'>
				<section className='CreateBudget p-4 w-full  bg-[#EBEBEB] rounded-lg row-span-4 col-span-2 h-fit'>
					<form className='FormToCreateBudget' onSubmit={handleSubmit}>
						{/* elements of the form */}
						{/* MATRICULA */}
						<div className='flex flex-col-2 justify-between'>
							<label className="text-2xl font-black mr-5" for="plate">Matricula</label>

							<div className='flex flex-row-reverse w-1/2'>
								<input className='bg-[#B4D1D3] p-2' type='text' id='plate' name="plate" value={formData.plate} onChange={handleChange}></input>
							</div>
						</div>
						{/* TITULO */}
						<div className='input flex flex-col-2 justify-between'>

							<label className="my-4" for="title">Título</label>
							<div className='flex flex-row-reverse w-full'>
								<Creatable
									onChange={(value) => handleTitleChange('titles', value)}
									options={titles}
									placeholder='Agrega un título'
									value={titleValue} />
							</div>
						</div>
						{/* SERVICIOS */}
						<div className='input flex flex-col-2 justify-between'>

							<label className="my-4" for="service">Servicio</label>
							<div className='flex flex-row-reverse w-full'>
								<div className='flex flex-row-reverse w-full'>
									<Creatable
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
								<div className='flex flex-row-reverse w-1/2'>
									<Creatable
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
							<div className='flex flex-row-reverse w-1/2'>
								<input className='bg-[#B4D1D3] p-1 my-4' type='text' name="price" value={formData.price} onChange={handleChange}></input>
							</div>
						</div>
						{/* bOTON AGREGAR */}
						<div className='flex flex-col-1 justify-end'>

							<button type='submit'> Agregar </button>
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
					<form id="installmetnsAndDueDate">
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


					</form>
					{/* CANCELAR CONFIRMAR O ENVIAR  */}
					<div className='flex flex-col-2 justify-between space-x-2'>
						<Button children="Cancelar" color="orange" size="normal" />
						<div className='flex space-x-4'>
							<Button children="Confirmado" color="orange" size="normal" />
							<Button children="Enviar" color="blue" size="normal" />

						</div>
					</div>

				</section>
			</section>
		</div >

	)
}
