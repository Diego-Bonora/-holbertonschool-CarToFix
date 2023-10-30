
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import './App.css'
import Home from './Pages/Home';
import Vehicle_history from "./Components/Vehicle_history";




function App() {


	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/vehicle" element={<Vehicle_history />} />
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App
