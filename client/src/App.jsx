
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import './App.css'
import Home from "./Pages/Home";
import CreateNewBudget from "./Pages/CreateNewBudget";


function App() {


	return (
		<>
			<BrowserRouter>

				<Routes>
					<Route path="/home" element={<Home />} />
					<Route path="/NewBudget" element={<CreateNewBudget />}></Route>


				</Routes>

			</BrowserRouter>
		</>
	)
}

export default App
