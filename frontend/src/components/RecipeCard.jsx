import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";


export default function RecipeCard({ recipe }) {
    const navigate = useNavigate();
    
    return (
        <Card>
            <CardActionArea sx={{ width: 345, height: 300 }} onClick={() => navigate(`/recipes/${recipe.id}`)}>
                <CardContent>
                    {recipe.image && (
                        <CardMedia
                            component="img"
                            height="140"
                            image={recipe.image}
                            alt={recipe.title}
                        />
                    )}
                    <Typography gutterBottom variant="h5" component="div">
                        {recipe.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {recipe.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}