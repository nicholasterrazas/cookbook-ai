import { useParams, useNavigate } from "react-router-dom";
import { Container, Typography, Box, Chip, List, ListItem, ListItemText, Button, Divider, CircularProgress, Stack, ButtonGroup, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

export default function RecipeDetails() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [alertOpen, setAlertOpen] = useState(false);

    const navigate = useNavigate();
    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        let intervalId;

        const fetchRecipe = async () => {
            let intervalId;
            try {
                const token = await getAccessTokenSilently({
                    authorizationParams: {
                        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
                    },
                });

                const res = await axios.get(`http://localhost:8000/recipes/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                let recipe = res.data;
                console.log(recipe);
                setRecipe(recipe);

                // poll until the recipe is done being processed
                if (recipe.status !== "completed") {
                    if (!intervalId) {
                        intervalId = setInterval(fetchRecipe, 2000);
                    }
                } else {
                    clearInterval(intervalId);
                    setLoading(false);
                }
            } catch (err) {
                console.error(err);
            }
        };

        fetchRecipe();    

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        }
    }, [id]);


    const handleEdit = () => {
        navigate(`/recipes/edit/${recipe._id}`);
    };

    const handleOpenAlert = () => {
        setAlertOpen(true);
    }

    const handleCloseAlert = () => {
        setAlertOpen(false);
    }

    const handleDelete = async () => {
        
        try {
            const token = await getAccessTokenSilently({
                authorizationParams: {
                    audience: import.meta.env.VITE_AUTH0_AUDIENCE,
                },
            });

            const res = await axios.delete(
                `http://localhost:8000/recipes/${recipe._id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            console.log(res);
            navigate("/recipes")
        } catch (err) {
            console.error(err);
        }
    };


    if (loading && (!recipe || recipe.status === "processing")) {
        return (
            <Container sx={{ py: 4, textAlign: "center" }}>
                <CircularProgress />
                <Typography>Processing your recipe...</Typography>
            </Container>
        )
    }

    
    if (!recipe) {
        return (
            <Typography>Recipe not found.</Typography>
        );
    }

  return (
    <Container sx={{ py: 4 }}>
        <React.Fragment>
        <Dialog
            open={alertOpen}
            onClose={handleCloseAlert}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            aria-hidden={true}
        >
            <DialogTitle id="alert-dialog-title">
                {"Delete Recipe?"}
            </DialogTitle>
            <DialogContent id="alert-dialog-description" sx={{font: "message-box", color: "GrayText"}}>
                Delete recipe. This means deleting the title, description, tags, and any information involved.
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseAlert} autoFocus>Cancel</Button>
                <Button onClick={handleDelete}>Delete</Button>
            </DialogActions>
        </Dialog>
        </React.Fragment>

            <Stack direction="row" sx={{justifyContent: "space-between"}}>
                <Button variant="outlined" onClick={() => navigate("/recipes")}>
                    Back
                </Button>

                <ButtonGroup variant="contained">
                    <Button onClick={handleEdit}>Edit</Button>
                    <Button onClick={handleOpenAlert}>Delete</Button>
                </ButtonGroup>
            </Stack>

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
