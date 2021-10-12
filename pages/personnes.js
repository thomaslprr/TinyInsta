import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ProTip from '../src/ProTip';
import Link from '../src/Link';
import Copyright from '../src/Copyright';
import ListePersonnes from "../src/ListePersonnes";

export default function Personnes() {
  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Personnes
        </Typography>
        <Button variant="contained" component={Link} noLinkStyle href="/">
          Retour
        </Button>
        <ListePersonnes/>
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
}
