
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import './App.css'
import PreLoginPage from './Pages/PreLoginPage'
import Home from './Pages/Home';
import NavBar from './Components/NavBar';
function App() {


	return (
		<>
			<BrowserRouter>
				<NavBar />
				<Routes>
					<Route path="/" element={<PreLoginPage />} />
					<Route path="/home" element={<Home />} />
				</Routes>

			</BrowserRouter>
		</>
	)
}

export default App
