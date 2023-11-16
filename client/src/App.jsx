
import { BrowserRouter, Routes, Route, Link} from "react-router-dom"
import Vehicle_history from "./Components/Vehicle_history";
import Vehicle from './Components/Vehicle';
import Service from './Components/Service';
import BudgetAll from "./Components/BudgetAll";
import SpecificBudget from "./Components/SpecificBudget";
import DetailsModal from "./Components/DetailsModal";

function App() {


	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/vehicle" element={<Vehicle />} />
					<Route path="/details/:id" element={<Vehicle_history/>}/>
					<Route path="/service" element={<Service/>} />
					<Route path="/budgets" element={<BudgetAll/>}/>
					<Route path="/specificbudget/:id" element={<SpecificBudget/>} />
					<Route path="/modal/:serviceId" element={<DetailsModal/>}/>
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App
