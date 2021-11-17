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


export default function ListePersonnes({data}) {

        const [dataToShow,setDataToShow]= useState(data);

        useEffect(()=> {
            setDataToShow(data);
        },[data])

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
                                    <Button variant="outlined" startIcon={<PersonAddIcon />}>
                                        S'abonner
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
}
