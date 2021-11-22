import * as React from 'react';
import Typography from '@mui/material/Typography';
import MuiLink from '@mui/material/Link';

export default function Copyright() {

  const style = {
    backgroundColor: "#F8F8F8",
    borderTop: "1px solid #E7E7E7",
    textAlign: "center",
    padding: "10px",
    position: "fixed",
    left: "0",
    bottom: "0",
    height: "60px",
    width: "100%"
  }

  const phantom = {
    display: 'block',
    padding: '20px',
    height: '60px',
    width: '100%'
  }

  return (
      <div className="footer">
        <div style={phantom}></div>
        <div style={style}>
    <Typography variant="body2" color="text.secondary" align="center" >
      {'Copyright © '}
      <MuiLink color="inherit" href="">
        TinyGram
      </MuiLink>{' '}
      {new Date().getFullYear()}
      <br/>
      Alex MAINGUY - Lucas LELIEVRE - Thomas LAPIERRE
    </Typography>
        </div>
      </div>
  );
}
