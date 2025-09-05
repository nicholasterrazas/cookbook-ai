import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container, Typography } from "@mui/material";
import Home from "./pages/Home";
import Recipes from "./pages/Recipes";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/recipes" element={<Recipes />} />
			</Routes>
		</Router>
	);
}

export default App
