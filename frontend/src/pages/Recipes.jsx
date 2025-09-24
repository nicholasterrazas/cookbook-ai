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
            axios.get("http://localhost:8000/recipes")
            .then((res) => {
                console.log("Recipes:", res.data);
                setRecipes(res.data);                
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                setLoading(false);
            });
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