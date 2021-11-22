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
import Logout from "../src/Logout";
import handleCheckToken from "../utils/checkToken";
import { refreshTokenSetup } from '../utils/refreshToken';
import Router from "next/router";
import {GoogleLogin} from "react-google-login";


export default function Index() {

    const clientId = '336706060084-qql5uihgm5k7nremguao6rfeeh1mptnd.apps.googleusercontent.com';
    const [txt,setTxt] = useState("Veuillez vous connecter avec google !");
    const onSuccess = (res) => {
        localStorage.setItem('email', res.profileObj.email);
        localStorage.setItem('token', res.tokenId);
        refreshTokenSetup(res);
        axios.post('https://tinygram2021.appspot.com/_ah/api/myApi/v1/getUser',res.profileObj )
            .then(response => {
                setLogged(true);
                setUser(JSON.parse(response.request.response).properties);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });

        setTxt("Chargement de la page... Veuillez patienter")
    };

    const onFailure = (res) => {
        console.log('Login failed: res:', res);
        alert(
            `Failed to login. 😢 `
        );
    };

  const [user,setUser] = useState({"imageUrl":""});
  const [offset, setOffset] = useState(0);
  const [response,setResponse] = useState([]);
  const [loading,setLoading] = useState(true);
  const [more,setMore] = useState(false);
  const [logged,setLogged] = useState(false);

   const handleShowMore = async () => {
       const email = await handleCheckToken();
       axios.get('https://tinygram2021.appspot.com/_ah/api/myApi/v1/post/' + email + '/' + offset)
           .then(result => {
               let res = JSON.parse(result.request.response);
               setResponse(response.concat(res.items));
               setLoading(false);
               setOffset(offset + 15);
               if (15 - res.items.length > 0) {
                   setMore(false);
               } else {
                   setMore(true);
               }
           })
           .catch(error => {
               console.error('There was an error!', error);
           });
   };

   const updatePostLiked = (date, emailCreate) => {
        let tmp = [... response];
        for(let i=0;i<tmp.length;i++){
            if(tmp[i].properties.email == emailCreate && tmp[i].properties.date == date){
                tmp[i].properties.cptLikes =  parseInt(tmp[i].properties.cptLikes)+1 ;
                tmp[i].properties.aAime = true;
                break;
            }
        }
        setResponse(tmp);
   };

    const handleClickLike = async (date, emailCreateur) => {
        const email = await handleCheckToken();
        axios.put('https://tinygram2021.appspot.com/_ah/api/myApi/v1/post/like',
            {datePhoto: new Date(date).getTime(), emailCreateurPhoto: emailCreateur, emailUserQuiLike: email})
            .then(result => {
                let res = JSON.parse(result.request.response);
                console.log("picture liked")
                updatePostLiked(new Date(date).toISOString(), emailCreateur);

            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    };


  useEffect(()=>{
      if(logged){
          handleShowMore();
      }

  },[logged]);

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
                    return <RecipeReviewCard key={row.properties.email+""+row.properties.date} pseudo={row.properties.pseudo} date={row.properties.date}
                  img={row.properties.image} description={row.properties.description} cptJaime={row.properties.cptLikes}
                                             email={row.properties.email} alreadyLike={row.properties.aAime}
                                             addLike={handleClickLike} profilImage={row.properties.profilImageLink}/>
              })}
              </div>
            )

      }
  };

  const showPage = () => {
      if(!logged){
          return (<div>
              <GoogleLogin
                  clientId={clientId}
                  buttonText="Login"
                  onSuccess={onSuccess}
                  onFailure={onFailure}
                  cookiePolicy={'single_host_origin'}
                  style={{ marginTop: '100px' }}
                  isSignedIn={true}
              />
              <br/>
              {txt}
          </div>)
      }else{
          return(
              <div>
              <Logout/>
              <br/>
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
          <br/>
          {showPage()}
        <Copyright />
      </Box>
    </Container>
  );
}
