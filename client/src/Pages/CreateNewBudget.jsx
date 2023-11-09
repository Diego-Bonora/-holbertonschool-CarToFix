import React, { useEffect, useState } from 'react'
import NewBudget from '../Components/NewBudget'
import RegisterVehicleModal from '../Components/RegisterVehicleModal'
import axios from 'axios'
import NavBar from '../Components/NavBar'


export default function CreateNewBudget() {

	const [plateRegistered, setPlateRetRegistered] = useState(true)
	const [clientRegistered, setClientRetRegistered] = useState(false)
	const [modalDisplayMode, setModalDisplayMode] = useState("none");
	const [formSubmited, setFormSubmited] = useState(false)
	const [actualClient, setActualClient] = useState([])
	const [actualVehicle, setActualVehicle] = useState([])




	let clientExist = false
	let userId = 'a6fbfd74-fc6f-48e7-ac16-90ee90121669'


	let baseURL = 'http://127.0.0.1:5000/'


	const checkPlate = (plate) => {

		axios.get((`${baseURL}/api/v1/vehicle/plate/${plate}`))
			.then((res) => {
				console.log("res", res)
				if (res.status == 200) {
					console.log("PLATE is on base")
					checkPlateRegistration(plate)
					localStorage.setItem('client_id', res.data.client_id)
					return res.data
				} else {
					return null
				}
			})

	}



	const checkPlateRegistration = (plate) => {
		console.log("on ckecking plate")
		const client_id = localStorage.getItem('client_id')
		if (plate.length === 8 && actualClient.length === 0) {
			const found = checkPlate(plate)
			console.log("searching plate... ", plate)
			if (!found) {
				setPlateRetRegistered(false);
				console.log("Vehicle is not registered")
			} else {
				console.log("Vehicle exist on Data Base...")
				axios.get((`${baseURL}/api/v1/vehicle/plate/${plate}`))
					.then((res) => {
						console.log("res", res)
						if (res.status == 200) {
							console.log("id of the vehicle with this plate is ", res.data.id)
							return res.data.id
						} else {
							return null
						}
					})

				setPlateRetRegistered(true)
			}
		}

	}

	const checkClient = (clientName) => {
		console.log("cliente ingresado", clientName)
		axios.get(`${baseURL}/api/v1/client`)
			.then((res) => {
				const clients = res.data
				console.log("clients", clients)
				const clientONBase = clients.filter((client) => client.name === clientName)
				console.log("search result", clientONBase)
				if (clientONBase != 0) {
					clientExist = true
					setClientRetRegistered(true)
					setActualClient(clientONBase)

					console.log("client exist: ", clientExist)
				} else {
					clientExist = false
					setClientRetRegistered(false)
					console.log("client exist: ", clientExist)
				}

			})

	}


	const modalState = (displayModal, callback) => {
		if (displayModal === 'active') {
			setFormSubmited(false)
		}
		if (displayModal === 'none') {
			setFormSubmited(true)
		}
		callback(); // Llama a la función de devolución de llamada
	}


	useEffect(() => {

		if (!plateRegistered) {
			setModalDisplayMode("active");
		}

		if (clientRegistered && formSubmited) {

			setModalDisplayMode("none");
		}

	})



	useEffect(() => {
		if (clientExist) {
			setClientRetRegistered(true)
		}
	}, [clientExist])




	return (
		<>
			<NavBar />
			<div className="w-screen h-screen  flex items-center  justify-center flex-row bg-cyan-200 justify-items-center ">
				<NewBudget checkPlateRegistration={checkPlateRegistration} actualVehicle={actualVehicle} actualClient={actualClient} />
				<RegisterVehicleModal display={modalDisplayMode} checkClient={checkClient} modalState={(displayModal) => modalState(displayModal, () => { })} clientExiste={clientRegistered} actualClient={actualClient} />
			</div>
		</>
	)
}
