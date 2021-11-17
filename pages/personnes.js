import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ProTip from '../src/ProTip';
import Link from '../src/Link';
import Copyright from '../src/Copyright';
import ListePersonnes from "../src/ListePersonnes";
import {useEffect} from "react";
import axios from "axios";
import {useState} from "react";

export default function Personnes() {
    const [res,setRes]=useState([]);
    function createData(id,url,name,followers,following,abonne) {
        return {id,url,name,followers,following,abonne};
    }

  useEffect(()=> {
      let email = localStorage.getItem("email");
      axios.get('https://tinygram2021.appspot.com/_ah/api/myApi/v1/friends/'+email )
        .then(response => {
          let resultat = JSON.parse(response.request.response);
          let resTmp = [];
          resultat.items.map((row)=> {
              if(row.properties.email != email) {
                  resTmp.push(createData(row.properties.email, row.properties.imageUrl, row.properties.name, row.properties.cptFollower, row.properties.cptFollowing,0))
              }
          });
          setRes(resTmp);
        })
        .catch(error => {
          console.error('There was an error!', error);
        });
  },[])

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Personnes
        </Typography>
        <Button variant="contained" component={Link} noLinkStyle href="/">
          Retour
        </Button>
        <ListePersonnes data={res}/>
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
}
