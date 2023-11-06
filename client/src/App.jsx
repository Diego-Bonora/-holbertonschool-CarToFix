
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import Vehicle_history from "./Components/Vehicle_history";
import Vehicle from './Components/Vehicle';
import Service from './Components/Service';
import AllBudget from "./Components/AllBudget";

function App() {


	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/vehiculo" element={<Vehicle />} />
					<Route path="/history" element={<Vehicle_history/>}/>
					<Route path="/service" element={<Service/>} />
					<Route path="/budgets" element={<AllBudget/>}/>
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App
