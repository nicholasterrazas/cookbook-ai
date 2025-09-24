import { Box, Container, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import ManualInputRecipeForm from "../components/ManualInputRecipeForm";
import VideoInputRecipeForm from "../components/VideoInputRecipeForm";



export default function NewRecipe() {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
    <Container sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
            Add a New Recipe
        </Typography>
        
        <Box>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="input type tabs">
                    <Tab label="Manual input" />
                    <Tab label="Video AI input" />
                </Tabs>
            </Box>
        </Box>
        {value == 0 && <ManualInputRecipeForm />}
        {value == 1 && <VideoInputRecipeForm />}
    </Container>
  );
}