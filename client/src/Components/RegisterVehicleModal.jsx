import React from 'react'

export default function RegisterVehicleModal({ display, plate }) {



	const displayModal = {
		none: 'hidden',
		active: ' "relative z-10" aria- labelledby="modal-title" role = "dialog" aria - modal="true"'

	}

	const handleVehiculeSubmit = () => {
		console.log("Vehiculo ingresado")
	}



	return (
		<div>

			<div className={`${displayModal[display]}`}>
				<form className='FormToCreateVehicule' onSubmit={handleVehiculeSubmit}>

					<div classNam="fixed inset- bg-gray-500 bg-opacity-75 transition-opacity"></div>

					<div className="fixed inset-0 z-10 w-screen overflow-y-auto">
						<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

							<div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
								<div className="bg-white  px-4 pb-4 pt-5 sm:p-6 sm:pb-4 w ">
									<div className="flex sm:items-start">

										<div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
											<h3 className="text-2xl font-semibold leading-6 text-gray-900" id="modal-title">Nuevo vehículo</h3>
											<div className="grid mt-2 gap-y-3">
												<p className="text-sm text-gray-500">Ingresa los datos del nuevo vehículo</p>
												<div className='flex flex-col-2 justify-between'>
													<label className=" font-black mr-2 mt-3 " for="plate">Matricula</label>

													<div className='flex flex-row-reverse w-1/2'>
														<input className='bg-[#B4D1D3]  text-right w-1/2 h-full px-6 mt-2' type='text' id='' name="" value='' placeholder='XXX-0000' ></input>
													</div>

												</div>
												<div className='flex flex-col-2 justify-between'>
													<label className=" mr-2 mt-3 " for="plate">Marca</label>

													<div className='flex flex-row-reverse w-1/2'>
														<input className='bg-[#B4D1D3]  text-right w-1/2 h-full px-6 mt-2' type='text' id='' name="" value=''  ></input>
													</div>

												</div>
												<div className='flex flex-col-2 justify-between'>
													<label className=" mr-2 mt-3 " for="plate">Modelo</label>

													<div className='flex flex-row-reverse w-1/2'>
														<input className='bg-[#B4D1D3]  text-right w-1/2 h-full px-6 mt-2' type='text' id='' name="" value='' ></input>
													</div>

												</div>
												<div className='flex flex-col-2 justify-between'>
													<label className=" mr-2 mt-3 " for="plate">Color</label>

													<div className='flex flex-row-reverse w-1/2'>
														<input className='bg-[#B4D1D3]  text-right w-1/2 h-full px-6 mt-2' type='text' id='' name="" value='' ></input>
													</div>

												</div>
												<div className='flex flex-col-2 justify-between'>
													<label className=" mr-2 mt-3 " for="plate">Color</label>

													<div className='flex flex-row-reverse w-1/2'>
														<input className='bg-[#B4D1D3]  text-right w-1/2 h-full px-6 mt-2' type='text' id='' name="" value=''  ></input>
													</div>

												</div>
												<div className='flex flex-col-2 justify-between'>
													<label className=" mr-2 mt-3 " for="plate">Kilñometraje</label>

													<div className='flex flex-row-reverse w-1/2'>
														<input className='bg-[#B4D1D3]  text-right w-1/2 h-full px-6 mt-2' type='text' id='' name="" value=''  ></input>
													</div>

												</div>
												<div className='flex flex-col-2 justify-between'>
													<label className=" mr-2 mt-3 " for="plate">Tipo de vehiculo</label>

													<div className='flex flex-row-reverse w-1/2'>
														<input className='bg-[#B4D1D3]  text-right w-1/2 h-full px-6 mt-2' type='text' id='' name="" value='' ></input>
													</div>

												</div>
												<div className='flex flex-col-2 justify-between'>
													<label className=" mr-2 mt-3 " for="plate">Propietario</label>

													<div className='flex flex-row-reverse w-1/2'>
														<input className='bg-[#B4D1D3]  text-right w-1/2 h-full px-6 mt-2' type='text' id='' name="" value='' ></input>
													</div>

												</div>
												<div className='flex flex-col-2 justify-between'>
													<label className=" mr-2 mt-3 " for="plate">E-mail</label>

													<div className='flex flex-row-reverse w-1/2'>
														<input className='bg-[#B4D1D3]  text-right w-1/2 h-full px-6 mt-2' type='text' id='' name="" value='' ></input>
													</div>

												</div>
												<div className='flex flex-col-2 justify-between'>
													<label className=" mr-2 mt-3 " for="plate">Teléfono</label>

													<div className='flex flex-row-reverse w-1/2'>
														<input className='bg-[#B4D1D3]  text-right w-1/2 h-full px-6 mt-2' type='text' id='' name="" value='' ></input>
													</div>

												</div>

											</div>
										</div>
									</div>
								</div>
								<div className="py-3 sm:flex sm:flex-row-reverse sm:px-6">
									<button type='submit' className="inline-flex w-full justify-center rounded-md bg-teal-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-700 sm:ml-3 sm:w-auto">Registrar</button>
									<button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
								</div>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	)
}


