import React, { useEffect, useState } from 'react'
import NewBudget from '../Components/NewBudget'
import RegisterVehicleModal from '../Components/RegisterVehicleModal'



export default function CreateNewBudget() {

	const [registered, setRegistered] = useState(true)



	const plates = [
		{ plate: "BVA-1234" },
		{ plate: "BBC-1234" },
		{ plate: "CIA-1234" },
		{ plate: "FBI-1234" },
	]



	const [modalDisplayMode, setModalDisplayMode] = useState("none");


	const checkPlateRegistration = (plate, plates) => {
		console.log("on ckecking plate")
		if (plate.length === 8) {
			useEffect(() => {
				axios.get((`${baseURL}/api/v1/vehicle/plate/${plate}`))
					.then((res) => {

					})
			})
			const found = plates.some(p => p.plate === plate);
			console.log("searching plate... ", plate)
			if (!found) {
				setRegistered(false);
				console.log("Vehicule is not registered")
			} else {
				console.log("Vehiculo registrado...")
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
				<NewBudget checkPlateRegistration={checkPlateRegistration} plates={plates} />
				<RegisterVehicleModal display={modalDisplayMode} />
			</div>
		</>
	)
}
