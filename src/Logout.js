import React from 'react';
import { GoogleLogout } from 'react-google-login';
import Router from "next/router";


const Logout = () => {

    const clientId = '336706060084-qql5uihgm5k7nremguao6rfeeh1mptnd.apps.googleusercontent.com';

    const onSuccess = () => {
        console.log('Logout made successfully');
        Router.push('/login');
    };

    return (
        <div>
            <GoogleLogout
                clientId={clientId}
                buttonText="Logout"
                onLogoutSuccess={onSuccess}
            ></GoogleLogout>
        </div>
    );
}

export default Logout;
