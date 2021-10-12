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

export default function Index() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          TinyInsta
        </Typography>
        <Creation/>
        <Button component={Link} noLinkStyle href="/personnes" color="primary" endIcon={<PersonAddIcon/>}>
          Ajouter des personnes
        </Button>

        <LoadPost/>
        <LoadPost/>
        <LoadPost/>
        <LoadPost/>
        <LoadPost/>
        <RecipeReviewCard/>
        <RecipeReviewCard/>
        <RecipeReviewCard/>
        <Button variant="contained" endIcon={<AddIcon />}>
          Voir plus
        </Button>
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
}
