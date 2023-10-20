
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import './App.css'
import Home from './Pages/Home';




function App() {


	return (
		<>
			<BrowserRouter>

				<Routes>
					<Route path="/home" element={<Home />} />

				</Routes>

			</BrowserRouter>
		</>
	)
}

export default App
