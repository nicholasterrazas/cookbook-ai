import { Card, CardActionArea, CardContent, Typography } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";

export default function NewRecipeCard() {
    const navigate = useNavigate();
    return (
        <Card>
            <CardActionArea sx={{ width: 345, height: 300 }} onClick={() => navigate("/recipes/new")} >
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