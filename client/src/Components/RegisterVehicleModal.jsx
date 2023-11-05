import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import MessageZone from './MessageZone';


export default function RegisterVehicleModal({ display, checkClient, modalState, data, clientExiste }) {



	let baseURL = 'http://127.0.0.1:5000'

	let [newVehicleSubmited, setnewVehicleSubmited] = useState(false)

	const [newData, setNewData] = useState([]);

	const [formVehicleClientData, setFormVehicleClientData] = useState([{
		name: "", mail: "", phone: "", plate: "", type_vehicle_id: "", brand: "", model: "", color: "", kms: ""
	}])

	const onFormChange = (event) => {

		const { name, value } = event.target;
		setFormVehicleClientData((prevFormData) => ({ ...prevFormData, [name]: value }));


	}




	const displayModal = {
		none: 'hidden',
		active: ' "relative z-10" aria- labelledby="modal-title" role = "dialog" aria - modal="true"'

	}


	const handleNewData = (event) => {
		event.preventDefault();
		const newVehicleData = {
			name: formVehicleClientData.name,
			mail: formVehicleClientData.mail,
			phone: formVehicleClientData.phone,
			plate: formVehicleClientData.plate,
			type_vehicle_id: formVehicleClientData.type_vehicle_id,
			brand: formVehicleClientData.brand,
			model: formVehicleClientData.model,
			color: formVehicleClientData.color,
			kms: formVehicleClientData.kms,
		};


		setNewData((prevData) => [...prevData, newVehicleData]);
		setnewVehicleSubmited(true)
		data((prevData) => [...prevData, newVehicleData])

		modalState('none', () => {
			// Código que se ejecuta después de actualizar el estado
		});



	};


	useEffect(() => {
		console.log("Vehiculo ingresado", newData);
		if (newVehicleSubmited === true) {

			modalState('none', () => { });
			console.log("submit has close the modal")
		}
	}, [newData]);

	const abortNewVehicle = () => {
		setFormVehicleClientData([])
		console.log("Aborting Add Vehicle or Clinet")
		window.location.reload(false);
	}

	useEffect(() => {
		console.log("estado de cliente ", clientExiste)
	}, clientExiste)



	return (
		<div>

			<div className={`${displayModal[display]}`}>
				<form className='FormToCreateVehicule' onSubmit={handleNewData} onChange={onFormChange}>

					<div classNam="fixed inset- bg-gray-500 bg-opacity-75 transition-opacity"></div>

					<div className="fixed inset-0 z-10 w-screen overflow-y-auto">
						<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

							<div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
								<div className="bg-white  px-4 pb-4 pt-5 sm:p-6 sm:pb-4 w ">
									<div className="flex sm:items-start">

										<div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
											<h3 className="text-2xl font-semibold leading-6 text-gray-900" id="modal-title">Nuevo vehículo</h3>
											<MessageZone display={clientExiste ? 'succes' : 'none'} text="Cliente registrado" />
											<div className="grid mt-2 gap-y-3">
												<p className="text-sm text-gray-500 mt-5">Ingresa datos del cliente</p>
												<div className='flex flex-col-2 justify-between'>
													<label className=" font-black mr-2 mt-3 " for="name">Nombre</label>

													<div className='flex flex-row-reverse w-1/2'>
														<input className='bg-[#B4D1D3]  text-right w-5/4 h-full px-6 mt-2' type='text' id='' name="name" value={formVehicleClientData.name} onChange={onFormChange} placeholder='Nombre y Apellido' ></input>
													</div>



												</div>


												<div className='flex flex-col-2 justify-between'>
													<label className=" font-black mr-2 mt-3 " for="mail">Mail</label>

													<div className='flex flex-row-reverse w-1/2'>
														<input className='bg-[#B4D1D3]  text-right w-5/4 h-full px-6 mt-2' type='text' id='' name="mail" value={formVehicleClientData.mail} onChange={onFormChange} onFocus={checkClient(formVehicleClientData.name)} placeholder='Correo' ></input>
													</div>

												</div>
												<div className='flex flex-col-2 justify-between'>
													<label className=" font-black mr-2 mt-3 " for="phone">Telefono</label>

													<div className='flex flex-row-reverse w-1/2'>
														<input className='bg-[#B4D1D3]  text-right w-3/4 h-full px-6 mt-2' type='text' id='' name="phone" value={formVehicleClientData.phone} onChange={onFormChange} placeholder='Teléfono' ></input>
													</div>

												</div>
												<p className="text-sm text-gray-500 mt-3">Ingresa los datos del nuevo vehículo</p>
												<div className='flex flex-col-2 justify-between'>
													<label className=" font-black mr-2 mt-3 " for="plate">Matricula</label>

													<div className='flex flex-row-reverse w-1/2'>
														<input className='bg-[#B4D1D3]  text-right w-3/4 h-full px-6 mt-2' type='text' id='' name="plate" value={formVehicleClientData.plate} onChange={onFormChange} placeholder='XXX-0000' ></input>
													</div>

												</div>
												<div className='flex flex-col-2 justify-between'>
													<label className=" mr-2 mt-3 " for="type_vehicle_id">Tipo de vehiculo</label>

													<div className='flex flex-row-reverse w-1/2'>
														<input className='bg-[#B4D1D3]  text-right w-3/4 h-full px-6 mt-2' type='text' id='' name="type_vehicle_id" value={formVehicleClientData.type_vehicle_id} onChange={onFormChange} placeholder='auto, moto, camión' ></input>
													</div>

												</div>
												<div className='flex flex-col-2 justify-between'>
													<label className=" mr-2 mt-3 " for="brand">Marca</label>

													<div className='flex flex-row-reverse w-1/2'>
														<input className='bg-[#B4D1D3]  text-right w-3/4 h-full px-6 mt-2' type='text' id='' name="brand" value={formVehicleClientData.brand} onChange={onFormChange}  ></input>
													</div>

												</div>

												<div className='flex flex-col-2 justify-between'>
													<label className=" mr-2 mt-3 " for="model">Modelo</label>

													<div className='flex flex-row-reverse w-1/2'>
														<input className='bg-[#B4D1D3]  text-right w-3/4 h-full px-6 mt-2' type='text' id='' name="model" value={formVehicleClientData.model} onChange={onFormChange} ></input>
													</div>

												</div>

												<div className='flex flex-col-2 justify-between'>
													<label className=" mr-2 mt-3 " for="color">Color</label>

													<div className='flex flex-row-reverse w-1/2'>
														<input className='bg-[#B4D1D3]  text-right w-3/4 h-full px-6 mt-2' type='text' id='' name="color" value={formVehicleClientData.color} onChange={onFormChange}  ></input>
													</div>

												</div>
												<div className='flex flex-col-2 justify-between'>
													<label className=" mr-2 mt-3 " for="kms">Kms</label>

													<div className='flex flex-row-reverse w-1/2'>
														<input className='bg-[#B4D1D3]  text-right w-1/2 h-full px-6 mt-2' type='text' id='' name="kms" value={formVehicleClientData.kms} onChange={onFormChange}  ></input>
													</div>

												</div>



											</div>
										</div>
									</div>
								</div>
								<div className="py-3 sm:flex sm:flex-row-reverse sm:px-6">
									<button type='submit' className="inline-flex w-full justify-center rounded-md bg-teal-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-700 sm:ml-3 sm:w-auto">Registrar</button>
									<button type="button" id="reset" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" onClick={abortNewVehicle}>Cancel</button>
								</div>
							</div>
						</div>
					</div>
				</form>
			</div >
		</div >
	)
}


