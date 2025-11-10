import { useAuth0 } from "@auth0/auth0-react";
import { Box, Button, Container, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export default function EditRecipe() {
    const [recipe, setRecipe] = useState(null);

    const { id } = useParams();
    const { isAuthenticated, getAccessTokenSilently } = useAuth0();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setRecipe({ ...recipe, [e.target.name]: e.target.value })
    };

    useEffect(() => {
        const fetchRecipe = async () => {
            if (!isAuthenticated) {
                return;
            }

            try {
                const token = await getAccessTokenSilently({
                    authorizationParams: {
                        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
                    },
                });

                const res = await axios.get(`${baseUrl}/recipes/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const fetchedRecipe = res.data; 

                // parse lists into strings
                const processedRecipe = {
                    ...fetchedRecipe,
                    ingredients: fetchedRecipe.ingredients.join("\n"),
                    instructions: fetchedRecipe.instructions.join("\n"),
                    tags: fetchedRecipe.tags.join(", "),
                }

                console.log(processedRecipe)

                setRecipe(processedRecipe);
            } catch (error) {
                console.error(error);
            }
        }
        fetchRecipe();
    }, [isAuthenticated, getAccessTokenSilently])


    const handleSubmit = async (e) => {
        e.preventDefault();

        const newRecipe = {
                ...recipe,
                ingredients: processIngredients(recipe.ingredients),
                instructions: processInstructions(recipe.instructions),
                tags: processTags(recipe.tags)
        };


        try {
            const token = await getAccessTokenSilently({
                authorizationParams: {
                    audience: import.meta.env.VITE_AUTH0_AUDIENCE,
                },
            });

            const res = await axios.put(
                `${baseUrl}/recipes/${recipe._id}`, 
                newRecipe,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log(res);
            const recipeId = res.data._id;
            navigate(`/recipes/${recipeId}`)
        } catch (err) {
            console.err(res);
        }
    }

    if (!recipe) {
        return (
            <Typography>Recipe not found.</Typography>
        );
    }

    
    return (
    <Container sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
            Edit Recipe
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate>
            <Stack spacing={3}>
                <TextField
                    label="Title"
                    name="title"
                    value={recipe.title}
                    onChange={handleChange}
                    required
                    fullWidth
                />

                <TextField
                    label="Description"
                    name="description"
                    value={recipe.description}
                    onChange={handleChange}
                    multiline
                    rows={2}
                    fullWidth
                />

                <TextField
                    label="Image URL"
                    name="image"
                    value={recipe.image}
                    onChange={handleChange}
                    fullWidth
                />

                <TextField
                    label="Ingredients (one per line)"
                    name="ingredients"
                    value={recipe.ingredients}
                    onChange={handleChange}
                    multiline
                    rows={4}
                    fullWidth
                />

                <TextField
                    label="Instructions (one per line)"
                    name="instructions"
                    value={recipe.instructions}
                    onChange={handleChange}
                    multiline
                    rows={4}
                    fullWidth
                />

                <TextField
                    label="Tags (comma separated)"
                    name="tags"
                    value={recipe.tags}
                    onChange={handleChange}
                    fullWidth
                />
            </Stack>
            <Button type="submit" variant="contained" color="primary">
                Save Changes
            </Button>
            <Button type="submit" variant="contained" color="primary">
                Cancel
            </Button>
        </Box>
    </Container>
    );
}