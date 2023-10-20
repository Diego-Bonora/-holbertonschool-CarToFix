
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import './App.css'
import NavBar from './Components/NavBar';
import CreateNewBudget from "./Pages/CreateNewBudget";

function App() {


	return (
		<>
			<BrowserRouter>
				<NavBar />
				<Routes>
					<Route path="/NewBudget" element={<CreateNewBudget />}></Route>
				</Routes>

			</BrowserRouter>
		</>
	)
}

export default App
