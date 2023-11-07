import React from 'react'
import DataBox from './DataBox'
import DataFrame from './DataFrame'
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
	]

	return (
		<>
			<div className=' bg-[#F5F5F5]'>
				<h2>DashBoard</h2>
				<div className='father w-screen h-screen'>
					<div className='grid-container grid-cols-1 grid-rows-3items-center p-4 m-auto'>
						<div className="grid gap-x-8 gap-y-4 grid-cols-4">
							<TitleBox className="col-start-3" title="Nombre de Taller" />
							<div></div>
							<DataFrame className="col-span-1" title="Presupuestos en espera" level="12" />
							<DataFrame className="col-span-3" title="Total de Vehiculos" level="6" />
						</div>
						<div className="dataframe grid gap-4 grid-cols-2">

							<DataBox title="Servicios Activos" info={data} />
							<DataBox title="Notificaciones Recientes" info={data} />

						</div>
					</div>

				</div>
			</div>
		</>
	)
}
