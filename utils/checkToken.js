import axios from "axios";
import React from "react";

import { useGoogleLogout } from 'react-google-login';
import Router from "next/router";
import LogoutHooks from "./logout";

const handleCheckToken = ({logoutFun}) => {

    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");

    if(email == null || token == null) {
        Router.push('/login');
        return null;
    }

    axios.get('https://oauth2.googleapis.com/tokeninfo?id_token='+token)
        .then(result => {
            if(result.email != email){
                logoutFun();
                Router.push('/login');
                return null;
            }else{
                return email;
            }
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
};

export default handleCheckToken;
