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


export default function RecipeReviewCard({pseudo,date,img,description,cptJaime,addLike,email,alreadyLike,profilImage}) {


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
    };

    const handleDoubleClick = (e) => {
      if(!alreadyLike){
          if(e.detail>=2){
              addLike(date,email);
          }
      }
    };

  return (
    <Card sx={{ maxWidth: 400,mb:4 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" src={profilImage}/>

        }
        title={pseudo}
        subheader={new Date(date).toLocaleString()}
        style={{color:"black"}}
      />
      <CardMedia
        component="img"
        height="100%"
        width="100%"
        image={img}
        alt="Paella dish"
        onClick={handleDoubleClick}
        style={{
            maxHeight: 400,
        }}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
            {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>

          {showLikeButton()}
            <Typography color="text.secondary" >
          {cptJaime} J'aime
            </Typography>
      </CardActions>
    </Card>
  );
}
