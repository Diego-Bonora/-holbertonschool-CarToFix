import React from 'react'

export default function MessageZone({ display, text }) {

	const displayMode = {
		none: "hidden",
		alert: "mb-4 rounded-lg bg-red-100 px-6 py-5 text-base text-black animate-jump-in",
		succes: "mb-4 rounded-lg bg-teal-500 px-6 py-5 text-base text-black aanimate-jump-in",
	}

	return (
		<>
			<div
				className={displayMode[display]}
				role="alert">
				{text}
			</div>
		</>
	)
}