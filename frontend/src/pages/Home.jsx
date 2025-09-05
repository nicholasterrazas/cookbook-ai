import { Container, Typography } from "@mui/material";

export default function Home() {
    return (
        <Container>
            <Typography variant="h3" align="center" gutterBottom>
                Recipe Scribe
            </Typography>
            <Typography variant="subtitle1" align="center" gutterBottom>
                Turn viral videos into your personal cookbook.
            </Typography>
        </Container>
    );
}