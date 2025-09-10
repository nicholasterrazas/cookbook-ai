import { Box, Button, Container, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { myRecipes, Recipe } from "../models/Recipe";
import { useNavigate } from "react-router-dom";

// split ingredients by newlines, so we can include quantities of ingredients if included
function processIngredients(ingredientsString) {
    return ingredientsString.split("\n");
}

// split instructions by newlines, since they usually include more than one word
function processInstructions(instructionsString) {
    return instructionsString.split("\n");
}

// split tags by comments, since they will just be words or phrases separated by them
function processTags(tagsString) {
    return tagsString.split(", ");
}


export default function NewRecipe() {
    const [form, setForm] = useState({
        title: "",
        description: "",
        image: "",
        ingredients: "",
        instructions: "",
        tags: "",
    })

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    };

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const processedIngredients = processIngredients(form.ingredients);
        const processedInstructions = processInstructions(form.instructions);
        const processedTags = processTags(form.tags);

        // TODO: PROCESS FORM -> send to backend
        const recipe = new Recipe({
                ...form,
                ingredients: processedIngredients,
                instructions: processedInstructions,
                tags: processedTags
        });
        myRecipes.push(recipe);
        console.log(myRecipes);

        console.log("New Recipe Submitted:" + recipe);

        navigate("/recipes")
    }

    return (
    <Container sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
            Add a New Recipe
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate>
            <Stack spacing={3}>
                <TextField
                    label="Title"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    required
                    fullWidth
                />

                <TextField
                    label="Description"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    multiline
                    rows={2}
                    fullWidth
                />

                <TextField
                    label="Image URL"
                    name="image"
                    value={form.image}
                    onChange={handleChange}
                    fullWidth
                />

                <TextField
                    label="Ingredients (one per line)"
                    name="ingredients"
                    value={form.ingredients}
                    onChange={handleChange}
                    multiline
                    rows={4}
                    fullWidth
                />

                <TextField
                    label="Instructions (one per line)"
                    name="instructions"
                    value={form.instructions}
                    onChange={handleChange}
                    multiline
                    rows={4}
                    fullWidth
                />

                <TextField
                    label="Tags (comma separated)"
                    name="tags"
                    value={form.tags}
                    onChange={handleChange}
                    fullWidth
                />
            </Stack>
            <Button type="submit" variant="contained" color="primary">
                Save Recipe
            </Button>
        </Box>
    </Container>
  );
}