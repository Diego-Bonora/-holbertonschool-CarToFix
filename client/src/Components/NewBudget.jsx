import React from 'react'
import SelectTitle from './SelectTitle'
import Button from './button'


export default function NewBudget() {
	return (
		<div className='w-screen bg-[#F5F5F5] h-screen p-10 '>
			<h1 className=' font-black'>Nuevo Presupuesto</h1>
			<section className='grid grid-flow-col grid-rows-3 gap-4 mt-10 justify-items-center'>
				<section className='p-4 w-full  bg-[#EBEBEB] rounded-lg row-span-4 col-span-2 h-fit'>
					<form>
						<div className='flex flex-col-2 justify-between'>
							<label className="text-2xl font-black mr-5" for="plate">Matricula</label>

							<div className='flex flex-row-reverse w-1/2'>
								<input className='bg-[#B4D1D3] p-2' type='text' id='plate'></input>
							</div>
						</div>
						<div className='flex flex-col-2 justify-between'>

							<label className="my-4" for="title">Título</label>
							<div className='flex flex-row-reverse w-full'>
								<SelectTitle />
							</div>
						</div>
						<div className='flex flex-col-2 justify-between'>

							<label className="my-4" fot="service">Servicio</label>
							<div className='flex flex-row-reverse w-full'>
								<div className='flex flex-row-reverse w-full'>
									<SelectTitle id="service" />
								</div>
							</div>
						</div>
						<div className='flex flex-col-2 justify-between'>

							<label className="my-4" fot="description">Descripción</label>
							<div className='flex flex-row-reverse w-1/2'>
								<textarea className='bg-[#B4D1D3] p-1 my-4 ml-3' id="description" name="description" rows="5" cols="50" placeholder='Describe el servicio a realizar o la falla reportada'>

								</textarea>
							</div>
						</div>
						<div className='flex flex-col-2 justify-between'>

							<label className="my-4" fot="asignedTTo">Asignado a</label>
							<div className='flex flex-row-reverse w-1/2'>
								<div className='flex flex-row-reverse w-1/2'>
									<SelectTitle id="asignedTTo" />
								</div>
							</div>
						</div>
						<div className='flex flex-col-2 justify-between'>

							<label className="my-4" fot="price">Precio</label>
							<div className='flex flex-row-reverse w-1/2'>
								<input className='bg-[#B4D1D3] p-1 my-4' type='text' id='price'></input>
							</div>
						</div>
					</form>

				</section>
				<section className='flex flex-row-reverse p-4 w-full h-[200px] border-[4px] border-[#B4D1D3] bg-[#EBEBEB] rounded-lg col-span-2'>
					<p> resume </p>

				</section>

				<section className='totals col-span-1 row-span-2 w-full'>
					<form>
						<div className='flex justify-between my-2'>
							<labal className="p-2" for="due_date">Vigente hasta </labal>
							<input className="bg-[#B4D1D3] p-2" type="date" id="due_date" name="due_date"></input>
						</div>
						<div className='flex justify-between my-2'>
							<labal className="p-2" for="installments ">Cuotas </labal>
							<input className='w-12 bg-[#B4D1D3] p-2' type="text" id="installments"></input>

						</div>
						<div className='flex justify-between my-2'>
							<span className='text-2xl font-black p-4'>TOTAL</span>
							<div className='text-2xl font-black  w-24 bg-[#B4D1D3] '>            </div>
						</div>


					</form>
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
