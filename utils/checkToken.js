import axios from "axios";
import React from "react";

import Router from "next/router";

const handleCheckToken = async () => {

    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");

    if(email == null || token == null) {
        Router.push('/logout');
    }

    axios.get('https://oauth2.googleapis.com/tokeninfo?id_token='+token)
        .then(result => {
            let res = JSON.parse(result.request.response);
            if(res.email != email){
                Router.push('/logout');
            }
        })
        .catch(error => {
            console.error('There was an error!', error);
            Router.push('/logout');
        });
};

export default handleCheckToken;
