import React, { useEffect, useState } from 'react'
import NewBudget from '../Components/NewBudget'
import RegisterVehicleModal from '../Components/RegisterVehicleModal'
import axios from 'axios'


export default function CreateNewBudget() {

	const [plateRegistered, setPlateRetRegistered] = useState(true)
	const [clientRegistered, setClientRetRegistered] = useState(false)
	const [modalDisplayMode, setModalDisplayMode] = useState("none");
	const [formSubmited, setFormSubmited] = useState(false)
	const [dataSubmited, setDataSubmited] = useState([])
	const [actualClient, setActualClient] = useState([])
	const [vehicleToSend, setVehicleToSend] = useState({
		plate: '',
		brand: '',
		model: '',
		color: '',
		mileage: '',
		user_id: '',
		client_id: '',
		vehicle_type: '',

	})



	let clientExist = false
	let userId = 'a6fbfd74-fc6f-48e7-ac16-90ee90121669'


	let baseURL = 'http://127.0.0.1:5000/'


	const checkPlate = (plate) => {

		axios.get((`${baseURL}/api/v1/vehicle/plate/${plate}`))
			.then((res) => {
				console.log("res", res)
				if (res.status == 200) {
					return res.data.plate
				} else {
					return ""
				}
			})

	}



	const checkPlateRegistration = (plate) => {
		console.log("on ckecking plate")

		if (plate.length === 8 && actualClient.length === 0) {
			const found = checkPlate(plate)
			console.log("searching plate... ", plate)
			if (!found) {
				setPlateRetRegistered(false);
				console.log("Vehicule is not registered")
			} else {
				console.log("Vehicle exist on Data Base...")
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

	const getVehCliData = (newdata) => {
		setDataSubmited(newdata);
	}

	useEffect(() => {
		console.log("data sumbmited", dataSubmited);
		console.log("actual client  sumbmited", actualClient);





	}, [dataSubmited])

	useEffect(() => {
		if (clientExist) {
			setClientRetRegistered(true)
		}
	}, clientExist)








	const createVehicle = (dataSubmited, actualClient, actualTypeOfVehicle) => {
		console.log("creating vehicle")
		console.log("data sumbmited on create ", dataSubmited);
		console.log("actual client sumbmited on create ", actualClient);
		console.log("actual type of vehicle on create ", actualTypeOfVehicle);

		setVehicleToSend({
			plate: dataSubmited.plate,
			brand: dataSubmited.brand,
			model: dataSubmited.model,
			color: dataSubmited.color,
			mileage: dataSubmited.kms,
			user_id: userId,
			client_id: actualClient.id,
			vehicle_type: dataSubmited.vehicle_type,

		})
		console.log("VEHICLE TO SEND ", vehicleToSend)
		// axios.post(`${baseURL}/api/v1/vehicle/`, vehicleToSend, {
		// 	headers: {
		// 		Accept: 'application/json',
		// 		'Content-Type': 'application/json'
		// 	}
		// })
		// 	.then(function (response) {
		// 		console.log(response);

		// 	})
		// 	.catch(function (error) {
		// 		console.log(error);
		// 	});

	}


	return (
		<>
			<div className="w-screen h-screen  flex items-center  justify-center flex-row bg-cyan-200 justify-items-center">
				<NewBudget checkPlateRegistration={checkPlateRegistration} />
				<RegisterVehicleModal display={modalDisplayMode} checkClient={checkClient} modalState={(displayModal) => modalState(displayModal, () => { })} data={getVehCliData} clientExiste={clientRegistered} />
			</div>
		</>
	)
}
