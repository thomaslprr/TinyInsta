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
import AddIcon from "@mui/icons-material/Add";

export default function Personnes() {
    const [res,setRes]=useState([]);
    const [offset,setOffset] = useState(0);
    const [more,setMore] = useState(false);
    const [loading,setLoading] = useState(true);

    function createData(id,url,name,followers,following,abonne) {
        return {id,url,name,followers,following,abonne};
    }

    const handleShowMore = () => {
        setLoading(true);
        let email = localStorage.getItem("email");
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
      handleShowMore();
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
          {loading ? "Chargement..." : ""}
          {more ?<Button variant="contained" endIcon={<AddIcon />} onClick={handleShowMore}>
              Voir plus
          </Button> : <div></div> }

        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
}
