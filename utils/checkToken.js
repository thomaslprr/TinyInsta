import axios from "axios";
import React from "react";

import Router from "next/router";

async function handleCheckToken(){

    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");

    if(email == null || token == null) {
        Router.push('/');
        return null;
    }

    return axios.get('https://oauth2.googleapis.com/tokeninfo?id_token='+token)
        .then(result => {
            let res = JSON.parse(result.request.response);
            if(res.email != email){
                Router.push('/error');
                return null;
            }

            return res.email;
        })
        .catch(error => {
            console.error('There was an error!', error);
            Router.push('/error');
            return null;
        });
};

export default handleCheckToken;
