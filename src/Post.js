import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {useEffect} from "react";


export default function RecipeReviewCard({pseudo,date,img,description,cptJaime,addLike,email,alreadyLike}) {

    useEffect(()=> {
        console.log(description+"    a aimé : "+alreadyLike);
    },[])


    const showLikeButton = () => {
        if(alreadyLike){
            return (<IconButton aria-label="add to favorites" >
                <FavoriteIcon style={{fill: "red"}}/>
            </IconButton>);
        }else{
            return (<IconButton aria-label="add to favorites" onClick={()=>addLike(date,email)}>
                <FavoriteBorderIcon />
            </IconButton>);
        }
    }

  return (
    <Card sx={{ maxWidth: 345,mb:4 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        title={pseudo}
        subheader={new Date(date).toLocaleString()}
      />
      <CardMedia
        component="img"
        height="194"
        image={img}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
            {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>

          {showLikeButton()}

          {cptJaime} J'aime
      </CardActions>
    </Card>
  );
}
