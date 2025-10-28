import { Button, Container, Grid, Typography } from "@mui/material";
import RecipeCard from "../components/RecipeCard";
import NewRecipeCard from "../components/NewRecipeCard";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import LoginPrompt from "../components/LoginPrompt";


export default function Recipes() {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    const { isAuthenticated, getAccessTokenSilently } = useAuth0();


    useEffect(() => {
        const fetchRecipes = async () => {
            console.log(isAuthenticated);
            if (!isAuthenticated) {
                // setLoading(false);
                return;
            }

            try {
                const token = await getAccessTokenSilently({
                    authorizationParams: {
                        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
                    },
                });

                console.log(token);
                const res = await axios.get("http://localhost:8000/recipes", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                console.log("Recipes:", res.data);
                setRecipes(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipes();
    }, [isAuthenticated, getAccessTokenSilently]);


    if (loading) {
        return (
            <Container sx={{ py: 4 }}>
                <Typography variant="h6">Loading recipes...</Typography>
            </Container>
        );
    }


    if (!isAuthenticated) {
        return <LoginPrompt />;
    }


    return (
        <Container sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom>
                My Recipes
            </Typography>
            <Grid container spacing={3}>
                <Grid key="-1">
                    <NewRecipeCard />
                </Grid>
                {recipes.map((recipe, index) => (
                    <Grid key={index}>
                        <RecipeCard recipe={recipe} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}