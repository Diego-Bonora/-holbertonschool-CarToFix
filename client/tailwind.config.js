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
				'shadow_header': '#127DCA',
				'page_background': '#F5F5F5',
				'gris-background': '#C5C5C5',
				'orange-claro': '#E83600',
				'orange-oscuro': '#E81806',
			},
			height: {
				'bloque': '98%',
				'bloque_login': '85%',
				'info_vehiculo': '15%',
				'info_history': '55%',
				'info_history_2': '45%',
			},
			width: {
				'list': '85%',
				'list-1': '80%',
			},
			fontFamily: {
				'Inter': ['Inter', 'sans'],
			},
			spacing: {
				'pad-1': '10%',
				'pad-2': '30%',
				'pad-3': '3%',
				'pad-4': '30%',
				'pad-5': '20%',
				'pad-6': '5%',
				'marg-1': '8%',
				'marg-2': '15%',
				'marg-3': '4%',
				'marg-4': '10%',
				'marg-5': '30%',
				'marg-6': '20%',
			},
			borderRadius: {
				'header_border': '20px',
			},
			margin: {
				'transparent': '0 0 1rem 0 transparent',
			},
			backgroundColor: {
				'no-bg': 'transparent',
			},
		},
	},
	plugins: [],
}

