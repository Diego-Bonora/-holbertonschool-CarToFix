
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import './App.css'
import Home from './Pages/Home';
import Vehicle_history from "./Components/Vehicle_history";
import Vehicle from './Components/Vehicle';
import Dashboard from "./Components/Dashboard";
import Service from './Components/Service';

function App() {


	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path='/home' element={<Dashboard/>} />
					<Route path="/Vehiculo" element={<Vehicle />} />
					<Route path="/history" element={<Vehicle_history/>}/>
					<Route path="/Service" element={<Service/>} />
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App
