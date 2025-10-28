import { useAuth0 } from "@auth0/auth0-react";
import { Button, Container, Typography } from "@mui/material";

export default function LoginPrompt() {

    const { loginWithRedirect} = useAuth0();

    return (
        <Container sx={{ py: 4 }}>
            <Typography variant="h5" gutterBottom>
                Please log in to view this page.
            </Typography>
            <Button variant="contained" color="primary" onClick={() => loginWithRedirect()}>
                Log in
            </Button>
        </Container>
    );
}