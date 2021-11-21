import React from 'react';
import { GoogleLogout } from 'react-google-login';


const Logout = () => {

    const clientId = '336706060084-qql5uihgm5k7nremguao6rfeeh1mptnd.apps.googleusercontent.com';

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
                buttonText="Logout"
                onLogoutSuccess={onSuccess}
            ></GoogleLogout>
        </div>
    );
};

export default Logout;
