import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import Navbar from "./components/Navbar";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
	palette: {
		primary: {
			main: '#c62828',
		},
		secondary: {
			main: '#2e7d32',
		},
	},
});

function App() {
	return (
		<ThemeProvider theme={theme}>
			<Navbar />
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/recipes" element={<Recipes />} />
				</Routes>
			</Router>
		</ThemeProvider>
	);
}

export default App
