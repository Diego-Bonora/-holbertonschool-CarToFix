
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import './App.css'
import PreLoginPage from './Pages/PreLoginPage'
import Home from './Pages/Home';
import SignUp from "./Components/SignUp";
import Vehicle_history from "./Components/Vehicle_history";
import Vehicle from './Components/Vehicle';
import Service from './Components/Service';
import BudgetAll from "./Components/BudgetAll";
import SpecificBudget from "./Components/SpecificBudget";
import DetailsModal from "./Components/DetailsModal";
import CreateNewBudget from "./Pages/CreateNewBudget";

function App() {


	return (
		<>
			<BrowserRouter>

				<Routes>
					<Route path="/" element={<PreLoginPage />} />
					<Route path="/home" element={<Home />} />
					<Route path="/SignUp" element={<SignUp />} />
					<Route path="/vehicle" element={<Vehicle />} />
					<Route path="/details/:id" element={<Vehicle_history />} />
					<Route path="/service" element={<Service />} />
					<Route path="/budgets" element={<BudgetAll />} />
					<Route path="/specificbudget/:id" element={<SpecificBudget />} />
					<Route path="/modal/:serviceId" element={<DetailsModal />} />
					<Route path="/NewBudget" element={<CreateNewBudget />} />
				</Routes>

			</BrowserRouter>
		</>
	)
}

export default App
