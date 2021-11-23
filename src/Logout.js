import React from 'react';
import { GoogleLogout } from 'react-google-login';


const Logout = () => {

    const clientId = "336706060084-887jpcku3dm7f2bf4qc7onefru1aptln.apps.googleusercontent.com";

    const onSuccess = () => {
        localStorage.removeItem("email");
        localStorage.removeItem('token');
        localStorage.removeItem('isLogged');
        console.log('Logout made successfully');
        window.location.reload();
    };

    return (
        <div>
            <GoogleLogout
                clientId={clientId}
                buttonText="Se déconnecter"
                onLogoutSuccess={onSuccess}
            ></GoogleLogout>
        </div>
    );
};

export default Logout;
