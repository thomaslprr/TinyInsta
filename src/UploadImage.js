import React, { useState, useEffect } from 'react';
import firebase from '../utils/firebase';
import { v4 as uuid } from 'uuid';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default function UploadImage({setUrl,setCommentaire}) {

    const [email,setEmail] = useState("");
    const [imageUrl, setImageUrl] = useState([]);
    const [isImageChoosen,setIsImageChossen] = useState(false);

    const readImages = async (e) => {
        if(isImageChoosen){
            deleteImage(imageUrl[0].id);
        }
        const file = e.target.files[0];
        const id = uuid();
        const storageRef = firebase.storage().ref(email).child(id);
        await storageRef.put(file);
        storageRef.getDownloadURL().then((url) => {
            const newState = [{ id, url }];
            setImageUrl(newState);
            setUrl(url);
            console.log("URL DE L'IMAGE : "+url);
            setIsImageChossen(true);
        });
    };


    const deleteImage = (id) => {
        const storageRef = firebase.storage().ref(email).child(id);
        storageRef.delete().then(() => {
            setImageUrl([]);
            setUrl("");
            console.log("deleted with success")
            setIsImageChossen(false);
        });
    };


    useEffect(() => {
        setEmail(localStorage.getItem("email"));
    }, [imageUrl]);

    return (
        <div>
            <Button
                variant="contained"
                component="label"
            >
                Choisir un fichier
            <input type="file" accept="image/*" onChange={readImages} hidden/>
            </Button>
            {imageUrl
                ? imageUrl.map(({ id, url }) => {
                    return (
                        <div key={id}>
                            <br/><br/>
                            <img src={url} alt=""  width="75%" height="75%" />
                            <br/>
                            <Button onClick={() => deleteImage(id)}>Delete</Button>
                        </div>
                    );
                })
                : ''}

                <br/><br/>
                <TextField
                id="outlined-multiline-static"
                label="Commentaire"
                multiline
                rows={4}
                fullWidth={true}
                placeholder="Ecris ton commentaire"
                onChange={setCommentaire}
            />
        </div>
    );
}
