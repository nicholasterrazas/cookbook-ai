import { AppBar, Box, Toolbar, Typography } from "@mui/material";


export default function Navbar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" >
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        RecipeScribe
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
}