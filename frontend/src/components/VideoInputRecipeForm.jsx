import { Box, Button, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export default function VideoInputRecipeForm() {
    return (
        <Box>
            <Typography variant="body1">
                Upload an MP4 file, and we'll generate a recipe from it!
            </Typography>
            
            <Button 
                component="label"
                role="undefined"
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
            >
                Upload MP4 File
                <VisuallyHiddenInput 
                    type="file"
                    accept="video/mp4"
                    onChange={(e) => console.log(e.target.files)}
                />
            </Button>
        </Box>
    );
}