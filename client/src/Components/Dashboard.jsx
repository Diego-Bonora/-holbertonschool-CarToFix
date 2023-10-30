import React from 'react'

import NavBar from './NavBar'

export default function Dashboard() {

	const data = [{
		matricula: 'ZZZ 2015',
		detalle: 'Cambio de aceite',
	},
	{
		matricula: 'SAF 6255',
		detalle: 'Chequeo general dl condnsador de flujos'
	},

	{
		matricula: 'ZZZ 2015',
		detalle: 'Revision de frenos',
	},
	{
		matricula: 'ZZZ 2015',
		detalle: 'Electricidad',
	},
	{
		matricula: 'ZZZ 2015',
		detalle: 'Tren delantero',
	}
	]

	return (
		<>
		<NavBar />
		</>

	)
}
