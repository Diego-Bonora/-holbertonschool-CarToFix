import React from 'react'
import Confirmation from './Confirmations'
import DataBox from './DataBox'
import DataFrame from './DataFrame'
import NewBudgetButton from './NewBudgetButton'
import TitleBox from './TitleBox'

export default function Dashboard() {

	const data = [{
		matricula: 'ZZZ 2015',
		detalle: 'Cambio de aceite',
	},
	{
		matricula: 'SAF 6255',
		detalle: 'Chequeo general dl codnensador de flujos'
	}
		,
	{
		matricula: 'SAF 6255',
		detalle: 'Chequeo general dl codnensador de flujos'
	},
	{
		matricula: 'SAF 6255',
		detalle: 'Chequeo general dl codnensador de flujos'
	},
	{
		matricula: 'SAF 6255',
		detalle: 'Chequeo general dl codnensador de flujos'
	},
	{
		matricula: 'SAF 6255',
		detalle: 'Chequeo general dl codnensador de flujos'
	},
	{
		matricula: 'ZZZ 2015',
		detalle: 'Cambio de aceite',
	},
	{
		matricula: 'ZZZ 2015',
		detalle: 'Cambio de aceite',
	},
	{
		matricula: 'ZZZ 2015',
		detalle: 'Cambio de aceite',
	}
	]

	return (
		<>
			<div className=' bg-[#F5F5F5] h-sreen'>
				<h2>DashBoard</h2>
				<div className='father flex flex-wrap  max-w-full'>
					<div className='flex flex-wrap md:grid md:grid-cols-1 p-4 md:place-content-evenly justify-center'>
						<div className="flex flex-wrap h-fit md:grid md:grid-cols-2 md:w-screen justify-items-center justify-center">
							<div className='h-20 md:mb-10 mb-20 md:w-full md:h-full justify-center -translate-y-16'>
								<TitleBox title="Nombre de Taller" />
							</div>
							<div className="flex flex-wrap h-full md:grid md:grid-cols-2 md:gap-8 md:place-items-center justify-items-center justify-center min-w-[50px " >

								<DataFrame title="Presupuestos en espera" level="12" />

								<DataFrame title="Total de Vehiculos" level="6" />

							</div>
						</div>

						<div className="dataframe flex flex-wrap w-screen md:grid md:grid-cols-2 justify-items-center justify-center">
							<DataBox title="Servicios Activos" info={data} />
							<div className='flex flex-col-1 flex-wrap justify-end'>
								<Confirmation title="Confirmaciones Recientes" info={data} />
								<NewBudgetButton />
							</div>

						</div>
					</div>

				</div>
			</div>
		</>
	)
}
