import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from "@mui/material/Button";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Avatar from "@mui/material/Avatar";
import {useState} from "react";
import {useEffect} from "react";
import axios from "axios";
import PersonIcon from '@mui/icons-material/Person';


export default function ListePersonnes({data}) {

        const [dataToShow,setDataToShow]= useState(data);

        function createFollow(email) {
            return JSON.parse("{\"follow\":\""+email+"\"}");
        }

        function follow(followEmail){
            let mail = localStorage.getItem("email");
            axios.put('https://tinygram2021.appspot.com/_ah/api/myApi/v1/friend/'+mail, createFollow(followEmail))
                .then(response => {
                    console.log("success");
                    let dataTmp = [...dataToShow];
                    for(let i = 0 ; i< dataTmp.length ;i++){
                        if(dataTmp[i].id == followEmail){
                            dataTmp[i].abonne= 1 ;
                            break;
                        }
                    }
                    setDataToShow(dataTmp);
                })
                .catch(error => {
                console.error('There was an error!', error);
            });
        }

        useEffect(()=> {
                setDataToShow(data);
        },[data])

        function showButton(abonne,id){
            if(abonne){
                return (<Button variant="contained" startIcon={<PersonIcon />}>
                    Abonné
                </Button>)
            }else{
                return( <Button variant="outlined" startIcon={<PersonAddIcon />} onClick={()=>follow(id)}>
                    S'abonner
                </Button>)
            }
        }

        return (

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center"></TableCell>
                            <TableCell>Nom</TableCell>
                            <TableCell align="right">Abonnés</TableCell>
                            <TableCell align="right">Abonnements</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dataToShow.map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="right"><Avatar alt="Remy Sharp" src={row.url} /></TableCell>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.followers}</TableCell>
                            <TableCell align="right">{row.following}</TableCell>
                            <TableCell align="right">
                                {showButton(row.abonne,row.id)}
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
}
