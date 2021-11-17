import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from "@mui/material/IconButton";
import {PhotoCamera} from "@mui/icons-material";
import styled from "@emotion/styled";
import ImageIcon from '@mui/icons-material/Image';
import Box from "@mui/material/Box";
import UploadImage from "../src/UploadImage";


const Input = styled('input')({
    display: 'none',
});

export default function Creation() {


    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button onClick={handleClickOpen} endIcon={<ImageIcon fontSize="inherit" />}>
                Ajouter une photo
            </Button>


            <Dialog open={open} onClose={handleClose} fullWidth={20}>
                <DialogTitle>Poster une photo</DialogTitle>
                <DialogContent>
                    <UploadImage></UploadImage>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Annuler</Button>
                    <Button onClick={handleClose}>Poster</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
