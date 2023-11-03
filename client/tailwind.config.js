/** @type {import('tailwindcss').Config} */

export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
		"./src/Components*.jsx",
		".src/Pages/*.jsx",

	],
	theme: {
		extend: {
			colors: {
				'cian-oscuro': '#09B6C2',
				'cian-claro': '#C5E9EA',
				'gris-claro': '#CCDBDB',
				'azul-oscuro': '#026DBB',
				'color-icons': '#4D88AE',
			}

		},
	},
	plugins: [

	],

}



