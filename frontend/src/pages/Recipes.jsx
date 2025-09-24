import { Container, Grid, Typography } from "@mui/material";
import RecipeCard from "../components/RecipeCard";
import NewRecipeCard from "../components/NewRecipeCard";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Recipes() {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await axios.get("http://localhost:8000/recipes");
                console.log("Recipes:", response.data);
                setRecipes(response.data);
            } catch (error) {
                console.error("Error fetching recipes:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipes();

    }, []);


    if (loading) {
        return (
            <Container sx={{ py: 4 }}>
                <Typography variant="h6">Loading recipes...</Typography>
            </Container>
        );
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