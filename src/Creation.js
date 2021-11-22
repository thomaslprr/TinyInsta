import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ImageIcon from '@mui/icons-material/Image';
import UploadImage from "../src/UploadImage";
import {useState} from "react";
import axios from "axios";


export default function Creation() {

    const [open, setOpen] = React.useState(false);

    const [commentaire, setCommentaire] = useState("");
    const [linkImage,setLinkImage] = useState("");
    const [isCommentaire,setIsCommentaire] = useState(false);
    const [isLinkImage,setIsLinkImage] = useState(false);
    const [loading,setLoading] = useState(false);
    const [txtButton,setTxtButton] = useState("Poster");

    const handleChange = (event) => {
        setIsCommentaire(true);
        if(event.target.value.trim().length == 0){
            setIsCommentaire(false);
        }
        setCommentaire(event.target.value);
    };

    const handleChangeUrl = (url) => {
        if(url==""){
            setIsLinkImage(false);
        }else{
            setIsLinkImage(true);
        }
        setLinkImage(url);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handlePoster = () => {
        let email = localStorage.getItem("email");
        let post = {email:email,image:linkImage,description:commentaire};
        setLoading(true);
        setTxtButton("Loading...");
        axios.post('https://tinygram2021.appspot.com/_ah/api/myApi/v1/post',post)
            .then(response => {
                let resultat = JSON.parse(response.request.response);
                console.log("RESULTAT");
                console.log(resultat);
                setOpen(false);
                setLoading(false);
                setTxtButton("Poster");
                setCommentaire("");
                setLinkImage("");
                setIsCommentaire(false);
                setIsLinkImage(false);
                window.location.reload();
            })
            .catch(error => {
                console.error('There was an error!', error);
                setLoading(false);
                setTxtButton("Poster");
            });
    };

    return (
        <div>
            <Button onClick={handleClickOpen} endIcon={<ImageIcon fontSize="inherit" />}>
                Ajouter une photo
            </Button>


            <Dialog open={open} onClose={handleClose} fullWidth={true}>
                <DialogTitle>Poster une photo</DialogTitle>
                <DialogContent>
                    <UploadImage setUrl={handleChangeUrl} setCommentaire={handleChange}></UploadImage>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Annuler</Button>
                    <Button onClick={handlePoster} disabled={(!isCommentaire || !isLinkImage)||loading}>{txtButton}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
