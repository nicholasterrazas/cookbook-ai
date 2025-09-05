import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";


export default function RecipeCard() {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
                <CardContent>
                    <CardMedia
                        component="img"
                        height="140"
                        image="https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_4:3/k%2FPhoto%2FRecipes%2F2024-05-pad-see-ew%2Fpad-see-ew-357"
                        alt="Pad See Ew"
                    />
                    <Typography gutterBottom variant="h5" component="div">
                        Pad See Ew
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        A popular Thai stir-fried noodle dish 
                        known for its chewy noodles and balanced, savory-sweet flavor  
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}