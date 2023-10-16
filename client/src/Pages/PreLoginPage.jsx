import React from 'react'
import Login from '../Components/login'

export default function PreLoginPage() {
	return (
		<>
			<div className="w-screen h-screen  flex items-center  justify-center flex-row bg-cyan-200">

				<div className="logo-app px-5 mr-40 logo h-[100px] w-2/5  bg-gray-100 "> logo </div>

				<Login />


			</div>
		</>
	)
}