import React from 'react'
import Confirmation from './Confirmations'
import DashboardDataBox from './DashboardDataBox'
import DataFrame from './DataFrame'
import NewBudgetButton from './NewBudgetButton'
import TitleBox from './TitleBox'
import axios from "axios"
import { useState } from 'react'
import { useEffect } from 'react'


export default function Dashboard() {




	// Columns for databoxes


	const serviceColumns = ['plate', 'description'];
	const budgetColumns = ['plate', 'created', 'services'];


	const baseURL = 'http://127.0.0.1:5000'

	// States for services and budgets data

	const [servicesData, setServicesData] = useState([
		{
			plate: "",
			description: "",
		}]);

	const [budgetData, setBudgetData] = useState([
		{
			plate: "",
			created: "",
			services: "",
		}]);



	console.log("budgets", budgetData)

	// Get a strig from services title array and truncat them for confirmation databox preview

	const truncateServicesTitles = (arr, lNum) => {
		if (arr) {

			let stringedArray = arr.join()
			if (stringedArray.length > lNum) {
				return stringedArray.slice(0, lNum) + '... '
			}
		} else { return "sin servios" }
	}

	// Get all data from API
	
	let userId = JSON.parse(localStorage.getItem('userID'));
	const [dashboardData, setDashboardData] = useState({})

	if (userId === null){
		window.location.href = "/"
	}

	const logOut = () => {
		console.log("entro")
		localStorage.removeItem('userID')
	}

	useEffect(() => {
		axios.get(`${baseURL}/api/v1/dashboard/${userId}`)
			.then((res) => {
				setDashboardData(res.data)
				console.log("dashboard data", dashboardData)
				let services = Object.values(dashboardData.active)
				if (services.length > 0) {
					setServicesData(services)
				} else {
					setServicesData([{
						plate: " ",
						description: "No hay servicios activos",
					}])
				}

				let arrServiceTitle = []

				let budgets = []
				if ((Object.values(dashboardData.budgets).length > 0)) {

					budgets = Object.values(dashboardData.budgets)
					arrServiceTitle = budgets.services
					budgets.services = truncateServicesTitles(arrServiceTitle, 55)
					setBudgetData(budgets)
				} else {
					budgets = [{
						plate: " ",
						created: "No ingresaron presupuestos",
						services: " ",
					}]
					setBudgetData(budgets)
				}
			})
	},
	)


	return (
		<>

			<div className='father flex flex-wrap  max-w-full mt-5'>
				<div className='flex flex-wrap md:grid md:grid-cols-1  md:place-content-evenly justify-center align-top h-full'>
					<div className="flex flex-wrap h-fit md:grid md:grid-cols-2 md:w-screen justify-items-center justify-center">
						{/* Titulo y DataFrames */}
						<div className='h-20 md:mb-10 mb-20 md:w-full md:h-full justify-center -translate-y-16'>
							<TitleBox title={dashboardData.user_name} />
							<button onClick={logOut}>Cerrar sesion</button>
						</div>
						<div className="flex flex-wrap h-full md:grid md:grid-cols-2 md:gap-8 md:place-items-center justify-items-center justify-center min-w-[50px] space-x-5 " >

							<DataFrame title="Presupuestos en espera" level='2' />

							<DataFrame title="Total de Vehiculos" level={dashboardData.vehicles_total} />

						</div>
					</div>
					{/* Databoxes inferiores con detalles */}
					<div className=" flex flex-wrap w-screen md:grid md:grid-cols-2 justify-items-center justify-center mr-10" >


						<div className='spac-x-5'>
							<div className=" p-2 md:x-92 flex flex-col w-fit bg-[#09B6C2] rounded-lg md:max-w-[800px] ">
								<div className="title h-10">
									<h3 className='text-2xl font-black text-center text-white'>Servicios activos</h3>
								</div>


								<DashboardDataBox columns={serviceColumns} info={servicesData} />

							</div>

						</div>
						<div>

							<div className="principal p-2 mt-10 md:x-92 flex flex-col bg-[#09B6C2] rounded-lg md:max-w-[800px] h-[200px] ">
								<div className="title h-10">
									<h3 className='text-2xl font-black text-center text-white p-1'>Confirmaciones Recientes</h3>
								</div>
								<Confirmation columns={budgetColumns} info={budgetData} />
							</div>
							<div className="flex justify-end mt-5">

								<NewBudgetButton className="flex justify-end" />
							</div>
						</div>
						{/* BOTON NUEVO PRESUPUESTO */}
					</div >





				</div >
			</div >

		</>
	)
}