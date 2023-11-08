
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import Vehicle_history from "./Components/Vehicle_history";
import Vehicle from './Components/Vehicle';
import Service from './Components/Service';
import BudgetAll from "./Components/BudgetAll";
import SpecificBudget from "./Components/SpecificBudget";

function App() {


	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/vehiculo" element={<Vehicle />} />
					<Route path="/history" element={<Vehicle_history/>}/>
					<Route path="/service" element={<Service/>} />
					<Route path="/budgets" element={<BudgetAll/>}/>
					<Route path="/specificbudget" element={<SpecificBudget/>} />
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App
