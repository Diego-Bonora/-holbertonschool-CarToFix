
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import './App.css'
import PreLoginPage from './Pages/PreLoginPage'
import Home from './Pages/Home';
import NavBar from './Components/NavBar';
import Signin from "./Components/Signin";
import CreateNewBudget from "./Pages/CreateNewBudget";

function App() {


	return (
		<>
			<BrowserRouter>
				<NavBar />
				<Routes>
					<Route path="/" element={<PreLoginPage />} />
					<Route path="/home" element={<Home />} />
					<Route path="/Signin" element={<Signin />}></Route>
					<Route path="/NewBudget" element={<CreateNewBudget />}></Route>
				</Routes>

			</BrowserRouter>
		</>
	)
}

export default App
