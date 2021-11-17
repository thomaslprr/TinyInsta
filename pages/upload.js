import * as React from 'react';
import UploadImage from "../src/UploadImage";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

export default function Upload() {


    return (
        <Container maxWidth="sm">
            <Box sx={{ my: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    TinyInsta
                </Typography>
        <UploadImage></UploadImage>
            </Box>
        </Container>
    );
}
