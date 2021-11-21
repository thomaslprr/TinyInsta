import React, {useEffect} from 'react';
import {useGoogleLogout} from "react-google-login";
import Router from "next/router";

const logout = () => {

    const clientId = process.env.client_id;

    const onFailure = () => {
        console.log('Handle failure cases');
    };

    const onLogoutSuccess = (res) => {
        console.log('Logged out Success');
        Router.push('/login');
    };

    const { signOut } = useGoogleLogout({
        clientId,
        onLogoutSuccess,
        onFailure,
    });

    useEffect(()=> {
        signOut();
    },[signOut])
    return (
        <div></div>
    )

}

export default logout;



