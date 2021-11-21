import React, {useEffect} from 'react';
import {useGoogleLogout} from "react-google-login";
import Router from "next/router";

const logout = () => {

    const clientId = '336706060084-qql5uihgm5k7nremguao6rfeeh1mptnd.apps.googleusercontent.com';

    const onFailure = () => {
        console.log('Handle failure cases');
        localStorage.removeItem("email");
        localStorage.removeItem('token');
        Router.push('/login');
    };

    const onLogoutSuccess = (res) => {
        localStorage.removeItem("email");
        localStorage.removeItem('token');
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



