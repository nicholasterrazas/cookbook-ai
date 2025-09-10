import { Card, CardActionArea, CardContent, Typography } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';

export default function NewRecipeCard() {
    return (
        <Card>
            <CardActionArea onClick={() => alert("Navigate to Add Recipe form")} >
                <CardContent sx={{ textAlign: "center" }}>
                    <AddIcon sx={{ fontSize: 60, color: "primary.main" }} />
                    <Typography variant="h6">
                        Add Recipe
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}