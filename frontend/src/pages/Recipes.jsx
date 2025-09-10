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
                <Grid key="-1">
                    <NewRecipeCard />
                </Grid>
                {myRecipes.map((recipe, index) => (
                    <Grid key={index}>
                        <RecipeCard recipe={recipe} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}