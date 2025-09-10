import { Container, Grid, Typography } from "@mui/material";
import RecipeCard from "../components/RecipeCard";
import { myRecipes } from "../models/Recipe";
import NewRecipeCard from "../components/NewRecipeCard";

export default function Recipes() {
    return (
        <Container sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom>
                My Recipes
            </Typography>
            <Grid container spacing={3}>
                {myRecipes.map((recipe, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <RecipeCard recipe={recipe} />
                    </Grid>
                ))}
                <Grid item xs={12} sm={6} md={4} key="addRecipe">
                    <NewRecipeCard />
                </Grid>
            </Grid>
        </Container>
    );
}