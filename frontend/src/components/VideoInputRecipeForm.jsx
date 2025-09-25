import { Box, Button, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from "axios";
import { useNavigate } from "react-router-dom";


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
    const navigate = useNavigate();

    const handleVideoUpload = (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("file", file)

        axios.post("http://localhost:8000/recipes/upload-video", formData, {
            headers: { "Content-Type": "multipart/form-data"}
        })
        .then((res) => {
            console.log(res);
            const recipeId = res.data._id
            navigate(`/recipes/${recipeId}`)
        })
        .catch((err) => {
            console.error(err);
        })
    };

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
                    onChange={handleVideoUpload}
                />
            </Button>
        </Box>
    );
}