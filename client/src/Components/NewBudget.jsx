import React from 'react'
import SelectTitle from './SelectTitle'
import Button from './button'
import ServiceItem from './ServiceItem'


export default function NewBudget() {

	let total = 0;

	let items = [
		{
			item: 'item 1',
			price: 540
		},
		{
			item: 'item 2',
			price: 600
		},
		{
			item: 'item 3',
			price: 6000
		},
		{
			item: 'item 4',
			price: 1500
		},
	]


	return (
		<div className='w-screen bg-[#F5F5F5] h-screen p-10 '>
			<h1 className=' font-black'>Nuevo Presupuesto</h1>
			<section className='principalFrames grid grid-flow-col grid-rows-3 gap-4 mt-10 justify-items-center'>
				<section className='CreateBudget p-4 w-full  bg-[#EBEBEB] rounded-lg row-span-4 col-span-2 h-fit'>
					<form className='FormToCreateBudget'>
						{/* elements of the form */}
						{/* MATRICULA */}
						<div className='flex flex-col-2 justify-between'>
							<label className="text-2xl font-black mr-5" for="plate">Matricula</label>

							<div className='flex flex-row-reverse w-1/2'>
								<input className='bg-[#B4D1D3] p-2' type='text' id='plate'></input>
							</div>
						</div>
						{/* TITULO */}
						<div className='flex flex-col-2 justify-between'>

							<label className="my-4" for="title">Título</label>
							<div className='flex flex-row-reverse w-full'>
								<SelectTitle id="title" />
							</div>
						</div>
						{/* SERVICIOS */}
						<div className='flex flex-col-2 justify-between'>

							<label className="my-4" fot="service">Servicio</label>
							<div className='flex flex-row-reverse w-full'>
								<div className='flex flex-row-reverse w-full'>
									<SelectTitle id="service" />
								</div>
							</div>
						</div>
						{/* DESCRIPTION TEXTAREA */}
						<div className='flex flex-col-2 justify-between'>

							<label className="my-4" fot="description">Descripción</label>
							<div className='flex flex-row-reverse w-1/2'>
								<textarea className='bg-[#B4D1D3] p-1 my-4 ml-3' id="description" name="description" rows="5" cols="50" placeholder='Describe el servicio a realizar o la falla reportada'>

								</textarea>
							</div>
						</div>
						{/* ASIGNADO A */}
						<div className='flex flex-col-2 justify-between'>

							<label className="my-4" fot="asignedTTo">Asignado a</label>
							<div className='flex flex-row-reverse w-1/2'>
								<div className='flex flex-row-reverse w-1/2'>
									<SelectTitle id="asignedTTo" />
								</div>
							</div>
						</div>
						{/* PRECIO */}
						<div className='flex flex-col-2 justify-between'>

							<label className="my-4" fot="price">Precio</label>
							<div className='flex flex-row-reverse w-1/2'>
								<input className='bg-[#B4D1D3] p-1 my-4' type='text' id='price'></input>
							</div>
						</div>
						{/* bOTON AGREGAR */}
						<div className='flex flex-col-1 justify-end'>
							<Button children="Agregar" size="normal" color="cyan" />
						</div>
					</form>

				</section>
				{/* RESUMEN DEL PRESUPUESTO  */}
				{/* LISTA DE ITEMS AGREGADOS */}
				<section className='p-4 w-full min-h-[200px] border-[4px] border-[#B4D1D3] bg-[#EBEBEB] rounded-lg'>
					{items.map((i) => {
						return (<div><ServiceItem item={i.item} price={i.price} /></div>)
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
							<labal className="p-2" for="due_date">Vigente hasta </labal>
							<input className="bg-[#B4D1D3] p-2" type="date" id="due_date" name="due_date"></input>
						</div>
						<div className='flex justify-between my-2'>
							<labal className="p-2" for="installments ">Cuotas </labal>
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
