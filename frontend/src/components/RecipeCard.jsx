import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";


export default function RecipeCard({ recipe }) {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
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