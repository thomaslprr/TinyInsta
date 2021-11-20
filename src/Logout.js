import React from 'react';
import { GoogleLogout } from 'react-google-login';
import Router from "next/router";

const clientId =
    '336706060084-q0bhshelogk7vg0rs0dm3163fr99vsri.apps.googleusercontent.com';

function Logout() {
    const onSuccess = () => {
        console.log('Logout made successfully');
        alert('Logout made successfully ✌');
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
