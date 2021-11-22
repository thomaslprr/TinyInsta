import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '../src/Link';
import Copyright from '../src/Copyright';
import ListePersonnes from "../src/ListePersonnes";
import {useEffect} from "react";
import axios from "axios";
import {useState} from "react";
import AddIcon from "@mui/icons-material/Add";
import handleCheckToken from "../utils/checkToken";
import {refreshTokenSetup} from "../utils/refreshToken";
import {GoogleLogin} from "react-google-login";

export default function Personnes() {



    const clientId = '336706060084-qql5uihgm5k7nremguao6rfeeh1mptnd.apps.googleusercontent.com';
    const [txt,setTxt] = useState("Veuillez vous connecter avec google !");
    const onSuccess = (res) => {
        localStorage.setItem('email', res.profileObj.email);
        localStorage.setItem('token', res.tokenId);
        refreshTokenSetup(res);
        axios.post('https://tinygram2021.appspot.com/_ah/api/myApi/v1/friend/'+res.profileObj.email,res.profileObj )
            .then(response => {
                console.log(response);
                setLogged(true);
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

    const [res,setRes]=useState([]);
    const [offset,setOffset] = useState(0);
    const [more,setMore] = useState(false);
    const [loading,setLoading] = useState(true);
    const [logged,setLogged] = useState(false);


    function createData(id,url,name,followers,following,abonne) {
        return {id,url,name,followers,following,abonne};
    }

    const handleShowMore = async () => {
        setLoading(true);
        let email = await handleCheckToken();
        axios.get('https://tinygram2021.appspot.com/_ah/api/myApi/v1/friends/'+email+'/'+offset )
            .then(response => {
                let resultat = JSON.parse(response.request.response);
                console.log("RESSSS");
                console.log(resultat);
                let resTmp = [];
                resultat.items.map((row)=> {
                    resTmp.push(createData(row.properties.email, row.properties.imageUrl, row.properties.name,
                        row.properties.cptFollower, row.properties.cptFollowing,row.properties.isFollowing))
                });
                setRes(res.concat(resTmp));
                setOffset(offset+30);
                if(30-resultat.items.length > 0){
                    setMore(false);
                }else{
                    setMore(true);
                }
                setLoading(false);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    };

  useEffect(()=> {
      if(logged){
          handleShowMore();
      }
  },[logged]);

  const affichage = ()=> {
      if(logged){
          return(
              <div>
              <ListePersonnes data={res}/>
          {loading ? "Chargement..." : ""}
          {more ?<Button variant="contained" endIcon={<AddIcon />} onClick={handleShowMore}>
              Voir plus
          </Button> : <div></div> }
              </div>
          )
      }else{
          return(
              <div>
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
              </div>
          )
      }
  }

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Personnes
        </Typography>
        <Button variant="contained" component={Link} noLinkStyle href="/">
          Retour
        </Button>
          {affichage()}

        <Copyright />
      </Box>
    </Container>
  );
}
