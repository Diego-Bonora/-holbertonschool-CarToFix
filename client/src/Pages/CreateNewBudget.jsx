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
	const [typedPlate, setTypedPlate] = useState('')

	localStorage.setItem('plate', '0')

	let plateChecked = false
	let clientExist = false

	let userId = 'cf3240a0-62b8-4f61-ad03-45d2011cb719'


	let baseURL = 'http://127.0.0.1:5000/'

	const checkClient = async (clientName) => {
		console.log("cliente ingresado", clientName)
		await axios.get(`${baseURL}/api/v1/client`)
			.then((res) => {
				const clients = res.data
				console.log("clients", clients)
				const clientONBase = clients.filter((client) => client.name === clientName)
				console.log("client search result", clientONBase)
				if (clientONBase != 0) {
					clientExist = true
					setClientRetRegistered(true)
					setActualClient(clientONBase)
					localStorage.setItem('client_id', res.data.id)
					let id_from_base = localStorage.getItem('client_id')
					console.log("client id from base", id_from_base)
					console.log("client exist: ", clientExist)
				} else {
					clientExist = false
					setClientRetRegistered(false)
					console.log("client exist: ", clientExist)

				}

			})

	}


	const checkPlateRegistration = (plate) => {
		console.log("on ckecking plate")

		setTypedPlate(plate)
		if (plate.length === 8 && !plateChecked) {
			axios.get((`${baseURL}/api/v1/vehicle/plate/${plate}`))
				.then((res) => {
					if (res.status === 200) {
						console.log("PLATE is on base", res.data.plate)
						localStorage.setItem('client_id', res.data.client_id)
						localStorage.setItem('plate', res.data.plate)
						setPlateRetRegistered(true)
						setActualVehicle(res.data)
						plateChecked = true
						console.log("platechecked ", plateChecked)
						console.log("plate regsitred state ", plateRegistered)

						return res.data
					} else {
						console.log("PLATE not registred")
						setPlateRetRegistered(false);

					}
				})
				.then(function (response) {
					console.log(response);
					setPlateRetRegistered(true)

				})
				.catch(function (response) {
					console.log("PLATE not registred")
					setPlateRetRegistered(false);
				}
				)



		}

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
				<RegisterVehicleModal display={modalDisplayMode} checkClient={checkClient} modalState={(displayModal) => modalState(displayModal, () => { })} clientExiste={clientRegistered} actualClient={actualClient} plate={typedPlate} />
			</div>
		</>
	)
}
