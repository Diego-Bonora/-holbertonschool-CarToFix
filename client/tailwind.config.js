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
        'gris-footer': '#D9D9D9',
        'azul-oscuro': '#026DBB',
        'color-icons': '#4D88AE',

			},
			height: {
        'bloque': '98%',
        'bloque_login': '85%',
      },
      fontFamily: {
        'Inter': ['Inter', 'sans'],
			},
			spacing: {
        'pad-1': '7%',
        'pad-2': '30%',
        'pad-3': '3%',
        'pad-4': '30%',
        'pad-5': '20%',
        'marg-1': '8%',
        'marg-2': '15%',
        'marg-3': '5%',
        'marg-4': '10%',
      },
		},
	},
	plugins: [],
}

