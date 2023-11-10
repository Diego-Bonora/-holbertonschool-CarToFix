import React, { useEffect, useState } from 'react'
import NewBudget from '../Components/NewBudget'
import RegisterVehicleModal from '../Components/RegisterVehicleModal'
import axios from 'axios'
import NavBar from '../Components/NavBar'
import { FaSoundcloud } from 'react-icons/fa'


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
		let first_look = true

		if (plate.length === 8 && actualClient.length === 0 && first_look === true) {
			axios.get((`${baseURL}/api/v1/vehicle/plate/${plate}`))
				.then((res) => {
					console.log("complete res vhe by plate", res)
					if (res.status === 200) {
						console.log("PLATE is on base", res.data.id)
						localStorage.setItem('client_id', res.data.id)
						setPlateRetRegistered(true)
						setActualVehicle(res.data)
						return res.data
					} else {
						console.log("PLATE not registred")
						setPlateRetRegistered(false);
						return null
					}
				})
				.then(function (response) {
					console.log(response);
					localStorage.setItem('client_id', response.data.client_id)



				})
				.catch(function (error) {
					console.log("error creating Plate", error);
					setPlateRetRegistered(false);
				});
			first_look = false

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
				<RegisterVehicleModal display={modalDisplayMode} checkClient={checkClient} modalState={(displayModal) => modalState(displayModal, () => { })} clientExiste={clientRegistered} actualClient={actualClient} />
			</div>
		</>
	)
}
