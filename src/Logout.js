import React from 'react';
import { GoogleLogout } from 'react-google-login';
import Router from "next/router";


const Logout = () => {

    const onSuccess = () => {
        console.log('Logout made successfully');
        Router.push('/login');
    };

    return (
        <div>
            <GoogleLogout
                clientId={process.env.client_id}
                buttonText="Logout"
                onLogoutSuccess={onSuccess}
            ></GoogleLogout>
        </div>
    );
}

export default Logout;
