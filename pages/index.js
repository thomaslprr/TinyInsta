import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ProTip from '../src/ProTip';
import Link from '../src/Link';
import Copyright from '../src/Copyright';
import RecipeReviewCard from '../src/Post';
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';
import Creation from "../src/Creation";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LoadPost from "../src/LoadCard"
import {useEffect} from "react";
import axios from "axios";
import {useState} from "react";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";

export default function Index() {

  const [user,setUser] = useState({"imageUrl":""});
  const [offset, setOffset] = useState(0);
  const [response,setResponse] = useState([]);
  const [loading,setLoading] = useState(true);
  const [more,setMore] = useState(false);

   const handleShowMore = () => {
       let email = localStorage.getItem("email");
       axios.get('https://tinygram2021.appspot.com/_ah/api/myApi/v1/post/'+email+'/'+offset )
           .then(result => {
               let res = JSON.parse(result.request.response);
               setResponse(response.concat(res.items));
               setLoading(false);
               if(15-res.items.length > 0){
                   setMore(false);
               }else{
                   setMore(true);
               }
           })
           .catch(error => {
               console.error('There was an error!', error);
           });
   };

  useEffect(()=> {
    let email = localStorage.getItem("email");
    axios.post('https://tinygram2021.appspot.com/_ah/api/myApi/v1/friend/'+email,null )
        .then(response => {
          let res = JSON.parse(response.request.response);
          setUser(res.properties);
          console.log(res.properties);
          setOffset(offset+15);
        })
        .catch(error => {
          console.error('There was an error!', error);
        });

        handleShowMore();



  },[]);

  const showPost = (bool) => {
      if(bool){
          return (
              <div>
              <LoadPost/>
              <LoadPost/>
              <LoadPost/>
              <LoadPost/>
              <LoadPost/>
              </div>
          )
      }else{
          return(
              <div>
                  {response.map((row) => {
                    return <RecipeReviewCard pseudo={row.properties.pseudo} date={row.properties.date}
                  img={row.properties.image} description={row.properties.description} cptJaime={row.properties.cptLikes}/>
              })}
              </div>
            )

      }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          TinyInsta
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs xs={2}>
            <Avatar alt="Remy Sharp" src={user.imageUrl} />
          </Grid>
          <Grid item xs>
            <p>Abonnements : {user.cptFollowing}</p>
          </Grid>
          <Grid item xs>
            <p>Abonnés : {user.cptFollower}</p>
          </Grid>
        </Grid>

        <Creation/>
        <Button component={Link} noLinkStyle href="/personnes" color="primary" endIcon={<PersonAddIcon/>}>
          Ajouter des personnes
        </Button>

          {showPost(loading)}

          {more ?<Button variant="contained" endIcon={<AddIcon />} onClick={handleShowMore}>
              Voir plus
          </Button> : <div></div> }

        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
}
