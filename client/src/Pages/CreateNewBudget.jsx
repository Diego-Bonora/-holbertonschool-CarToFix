import React, { useEffect, useState } from 'react'
import NewBudget from '../Components/NewBudget'
import RegisterVehicleModal from '../Components/RegisterVehicleModal'
import axios from 'axios'


export default function CreateNewBudget() {

	const [registered, setRegistered] = useState(true)



	let baseURL = 'http://127.0.0.1:5000/'

	const [modalDisplayMode, setModalDisplayMode] = useState("none");

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
		if (plate.length === 8) {
			const found = checkPlate(plate)
			console.log("searching plate... ", plate)
			if (!found) {
				setRegistered(false);
				console.log("Vehicule is not registered")
			} else {
				console.log("Vehicle exist on Data Base...")
				setRegistered(true)
			}
		}

	}

	useEffect(() => {
		if (!registered) {
			setModalDisplayMode("active");
		} else {
			setModalDisplayMode("none");

		}

	})


	return (
		<>
			<div className="w-screen h-screen  flex items-center  justify-center flex-row bg-cyan-200 justify-items-center">
				<NewBudget checkPlateRegistration={checkPlateRegistration} />
				<RegisterVehicleModal display={modalDisplayMode} />
			</div>
		</>
	)
}
