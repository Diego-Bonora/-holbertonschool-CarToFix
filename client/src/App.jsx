
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import './App.css'
import Home from "./Pages/Home";
import CreateNewBudget from "./Pages/CreateNewBudget";
import Vehicle_history from "./Components/Vehicle_history";
import Vehicle from './Components/Vehicle';
import Service from './Components/Service';
import BudgetAll from "./Components/BudgetAll";
import SpecificBudget from "./Components/SpeceficBudget";

function App() {


	return (
		<>
			<BrowserRouter>

				<Routes>
					<Route path="/home" element={<Home />} />
					<Route path="/NewBudget" element={<CreateNewBudget />}></Route>
					<Route path="/vehicle" element={<Vehicle />} />
					<Route path="/details/:id" element={<Vehicle_history />} />
					<Route path="/service" element={<Service />} />
					<Route path="/budgets" element={<BudgetAll />} />
					<Route path="/specificbudget/:id" element={<SpecificBudget />} />

				</Routes>

			</BrowserRouter>
		</>
	)
}

export default App
