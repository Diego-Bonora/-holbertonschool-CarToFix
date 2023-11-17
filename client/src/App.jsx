
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import './App.css'
import PreLoginPage from './Pages/PreLoginPage'
import Home from './Pages/Home';
import SignUp from "./Components/SignUp";
import CreateNewBudget from "./Pages/CreateNewBudget";


function App() {


	return (
		<>
			<BrowserRouter>

				<Routes>
					<Route path="/" element={<PreLoginPage />} />
					<Route path="/home" element={<Home />} />
					<Route path="/SignUp" element={<SignUp />} />
					<Route path="/NewBudget" element={<CreateNewBudget />}></Route>


				</Routes>

			</BrowserRouter>
		</>
	)
}

export default App
