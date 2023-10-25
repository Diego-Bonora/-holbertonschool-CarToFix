
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import './App.css'

import CreateNewBudget from "./Pages/CreateNewBudget";

function App() {


	return (
		<>
			<BrowserRouter>

				<Routes>
					<Route path="/NewBudget" element={<CreateNewBudget />}></Route>
				</Routes>

			</BrowserRouter>
		</>
	)
}

export default App
