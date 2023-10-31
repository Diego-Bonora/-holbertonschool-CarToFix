
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import './App.css'
import Home from './Pages/Home';
import Vehicle_history from "./Components/Vehicle_history";
import Vehicle from './Components/Vehicle';




function App() {


	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/Vehiculo" element={<Vehicle />} />
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App
