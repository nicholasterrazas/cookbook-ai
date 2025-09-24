import { useParams, useNavigate } from "react-router-dom";
import { Container, Typography, Box, Chip, List, ListItem, ListItemText, Button, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

export default function RecipeDetails() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecipe = async () => {
            axios.get(`http://localhost:8000/recipes/${id}`)
            .then((res) => {
                console.log(res.data);
                setRecipe(res.data);
            })
            .catch((err) => {
                console.error(err);
            })
        };

        fetchRecipe();    
    }, [id]);

    if (!recipe) {
        return (
            <Typography>Loading recipe...</Typography>
        );
  }

  return (
    <Container sx={{ py: 4 }}>
        <Button variant="outlined" onClick={() => navigate("/recipes")}>
            Back
        </Button>

        <Typography variant="h3" gutterBottom sx={{ mt: 2 }}>
        {recipe.title}
        </Typography>
        {recipe.image && (
            <Box
                component="img"
                src={recipe.image}
                alt={recipe.title}
                sx={{
                    width: "100%",
                    maxHeight: 400,
                    objectFit: "cover",
                    borderRadius: 2,
                    mb: 3,
                }}
            />
        )}

        {recipe.description && (
            <Typography variant="body1" paragraph>
                {recipe.description}
            </Typography>
        )}


        {recipe.tags?.length > 0 && (
        <Box sx={{ mb: 3 }}>
            {recipe.tags.map((tag, index) => (
                <Chip key={index} label={tag} sx={{ mr: 1, mb: 1 }} />
            ))}
        </Box>
        )}

        <Divider />

        <Typography variant="h5" gutterBottom>
            Ingredients
        </Typography>
        <List>
        {recipe.ingredients.map((ingredient, index) => (
            <ListItem key={index} disablePadding>
                <ListItemText primary={ingredient} />
            </ListItem>
        ))}
        </List>

        <Divider />

        <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
            Instructions
        </Typography>
        <List>
        {recipe.instructions.map((step, index) => (
            <ListItem key={index} disablePadding>
                <ListItemText primary={`${index + 1}. ${step}`} />
            </ListItem>
        ))}
        </List>
    </Container>
  );
}
