import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import Navbar from "./components/Navbar";
import { createTheme, ThemeProvider } from "@mui/material";
import { Auth0Provider } from "@auth0/auth0-react";
import NewRecipe from "./pages/NewRecipe";
import RecipeDetails from "./components/RecipeDetails";


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
		<Auth0Provider
			domain={import.meta.env.VITE_AUTH0_DOMAIN}
			clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
			authorizationParams={{
				redirect_uri: window.location.origin,
				audience: import.meta.env.VITE_AUTH0_AUDIENCE,
				scope: 'openid profile email',
			}}
		>
			<ThemeProvider theme={theme}>
				<Router>
					<Navbar />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/recipes" element={<Recipes />} />
						<Route path="/recipes/new" element={<NewRecipe />} />
						<Route path="/recipes/:id" element={<RecipeDetails />} />
					</Routes>
				</Router>
			</ThemeProvider>			
		</Auth0Provider>
	);
}

export default App
