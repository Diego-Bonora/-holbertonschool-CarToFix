import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Navigate, json, useNavigate } from 'react-router-dom';
import MessageZone from './MessageZone';


export default function RegisterVehicleModal({ display, checkClient, modalState, clientExiste, actualClient }) {


	let userId = 'a6fbfd74-fc6f-48e7-ac16-90ee90121669'
	let baseURL = 'http://127.0.0.1:5000'

	let [newVehicleSubmited, setnewVehicleSubmited] = useState(false)
	const [clientData, setClientData] = useState([])
	let [type, setType] = useState([])


	useEffect(() => {
		setClientData(actualClient);
	}, actualClient)

	let clientCreated = false
	let cliResponse = ''

	const [newData, setNewData] = useState([{
		plate: '',
		brand: '',
		model: '',
		color: '',
		mileage: '',
		vehicle_type: '',
		type_vehicle_id: '',
		client_id: '',
		user_id: '',
	}]);

	const [formVehicleClientData, setFormVehicleClientData] = useState([{
		name: "", email: "", phone: "", plate: "", vehicle_type: "", brand: "", model: "", color: "", kms: ""
	}])

	let typeExist = false
	const [typeOndVehicle, setTypeOnVehicle] = useState([])
	let [actualTypeOfVehicle, setActualTypeOfVehicle] = useState([{ id: "" }])



	const [vehicleToSend, setVehicleToSend] = useState([{
		plate: '',
		brand: '',
		model: '',
		color: '',
		mileage: '',
		vehicle_type: '',
		type_vehicle_id: "",
		cliend_id: "",
		user_id: "",


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

		const newVehicleData = [{
			name: formVehicleClientData.name,
			plate: formVehicleClientData.plate,
			vehicle_type: formVehicleClientData.vehicle_type,
			brand: formVehicleClientData.brand,
			model: formVehicleClientData.model,
			color: formVehicleClientData.color,
			mileage: formVehicleClientData.kms,

		}];


		console.log("vehicle data ", newVehicleData)
		setNewData((prevData) => [...prevData, newVehicleData]);
		setClientData(actualClient)

		createTypeVehicle(formVehicleClientData.vehicle_type)
		createBrand(formVehicleClientData.brand)
		createVehicle(newVehicleData)
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

	const createClient = () => {
		const clientToSend = JSON.stringify({
			name: formVehicleClientData.name,
			email: formVehicleClientData.mail,
			phone: formVehicleClientData.phone,

		})
		axios.post(`${baseURL}/api/v1/client`, clientToSend, {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			}
		})
			.then(function (response) {
				console.log(response);
				clientCreated = true
				cliResponse = response
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	const createTypeVehicle = (type) => {
		let typeIsIn = false;
		console.log("typed TYPE", type);
		console.log("type ingresado", type);
		if (type !== 0) {
			console.log("searching TYPE...");

			axios.get(`${baseURL}/api/v1/type`)
				.then((res) => {
					const types = res.data;
					console.log("existence types", types);
					const typesOnBase = types.filter((eachtype) => eachtype.name === type);
					console.log("type search result", typesOnBase);
					if (typesOnBase.length != 0) {
						typeExist = true;
						setTypeOnVehicle(true)
						let id = typesOnBase[0].id
						localStorage.setItem('tyID', id);
						setActualTypeOfVehicle({
							id: id,
						}
						);


						console.log("type exist: ", typesOnBase[0].id);
					} else {
						typeExist = false;

						console.log("type is not Registered : ", type);

						console.log("creating TYPE of Vehicle...", type);
						axios.post(`${baseURL}/api/v1/type`, JSON.stringify({
							name: type
						}), {
							headers: {
								Accept: 'application/json',
								'Content-Type': 'application/json'
							}
						})
							.then(function (response) {
								console.log(response);
								typeExist = true;
							})
							.catch(function (error) {
								console.log(error);
								typeExist = false;
							});
					}
				});
		}

	};

	const createVehicle = (newData) => {
		console.log("creating vehicle")
		console.log("data sumbmited on create ", newData);
		console.log("actual client sumbmited on create ", actualClient);
		console.log("actual type of vehicle on create ", actualTypeOfVehicle);

		let client_id = actualClient[0].id
		let type_vehicle_id = localStorage.getItem('tyID');
		let brand_id = localStorage.getItem('brandId');
		console.log("actual brand of vehicle on create ", brand_id);
		console.log("id EN LOCAL STORAGE", type_vehicle_id)
		if (newData) {

			let vdata = newData.map((e) => JSON.parse(JSON.stringify({
				plate: e.plate,
				brand: brand_id,
				model: e.model,
				color: e.color,
				mileage: parseInt(e.mileage),
				type_vehicle_id: type_vehicle_id,
				client_id: client_id,
				user_id: userId,
			})));



			console.log("VEHICLE TO SEND ", vdata[0])
			axios.post(`${baseURL}/api/v1/vehicle/`, JSON.stringify(vdata[0]), {
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				}
			})
				.then(function (response) {
					console.log(response);

				})
				.catch(function (error) {
					console.log(error);
				});
		}

	}
	const createBrand = (brand) => {
		if (brand) {
			console.log("searching for brand", brand)
			axios.get(`${baseURL}/api/v1/brand`)
				.then((res) => {
					const brands = res.data;
					console.log("existence brands", brands);
					const brandsOnBase = brands.filter((eachbrand) => eachbrand.name === brand);
					if (brandsOnBase.length != 0) {
						console.log("brand is registered", brand)
						let id = brandsOnBase[0].id
						localStorage.setItem('brandId', id);

					} else {
						console.log("brand is not registered", brand)
						console.log("creating brand", brand)
						axios.post(`${baseURL}/api/v1/brand`, JSON.stringify({
							name: brand
						}), {
							headers: {
								Accept: 'application/json',
								'Content-Type': 'application/json'
							}
						})
							.then(function (response) {
								console.log("response from brand CREATE", response.data);
								let id = response.data.id
								localStorage.setItem('brandId', id);
								console.log("brand id created ", id)
								localStorage.setItem('brandId', id);

							})
							.catch(function (error) {
								console.log(error);

							});


					}

				}
				)
		}


	}

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
														<input className='bg-[#B4D1D3]  text-right w-5/4 h-full px-6 mt-2' type='text' id='' name="mail" value={formVehicleClientData.mail} onChange={onFormChange} onFocus={clientExiste ? formVehicleClientData.name : checkClient(formVehicleClientData.name)} placeholder='Correo' disabled={clientExiste} ></input>
													</div>


												</div>
												<div className='flex flex-col-2 justify-between'>
													<label className=" font-black mr-2 mt-3 " for="phone">Telefono</label>

													<div className='flex flex-row-reverse w-1/2'>
														<input className='bg-[#B4D1D3]  text-right w-3/4 h-full px-6 mt-2' type='text' id='' name="phone" value={formVehicleClientData.phone} onChange={onFormChange} placeholder='Teléfono' disabled={clientExiste} ></input>
													</div>

												</div>
												<MessageZone display={clientCreated ? 'succes' : 'none'} text="Nuevo Cliente Creado" />
												<MessageZone display={cliResponse ? 'alert' : 'none'} text={cliResponse} />
												<p className="text-sm text-gray-500 mt-3">Ingresa los datos del nuevo vehículo</p>
												<div className='flex flex-col-2 justify-between'>
													<label className=" font-black mr-2 mt-3 " for="plate">Matricula</label>

													<div className='flex flex-row-reverse w-1/2'>
														<input className='bg-[#B4D1D3]  text-right w-3/4 h-full px-6 mt-2' type='text' id='' name="plate" value={formVehicleClientData.plate} onChange={onFormChange} onFocus={createClient} placeholder='XXX-0000' ></input>
													</div>

												</div>
												<div className='flex flex-col-2 justify-between'>
													<label className=" mr-2 mt-3 " for="viehicle_type">Tipo de vehiculo</label>

													<div className='flex flex-row-reverse w-1/2'>
														<input className='bg-[#B4D1D3]  text-right w-3/4 h-full px-6 mt-2' type='text' id='vehicle_type' name="vehicle_type" value={formVehicleClientData.vehicle_type} onChange={onFormChange} placeholder='auto, moto, camión' ></input>
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