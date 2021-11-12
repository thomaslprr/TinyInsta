import React, {useState} from 'react';
import Router from 'next/router'
import { GoogleLogin } from 'react-google-login';
// refresh token
import { refreshTokenSetup } from '../utils/refreshToken';

const clientId =
    '336706060084-q0bhshelogk7vg0rs0dm3163fr99vsri.apps.googleusercontent.com';

function Login() {

    const [txt,setTxt] = useState("Veuillez vous connecter avec google !");

    const onSuccess = (res) => {
        console.log('Login Success: currentUser:', res.profileObj);
        refreshTokenSetup(res);
        setTxt("Chargement de la page... Veuillez patienter")
        Router.push('/');
    };

    const onFailure = (res) => {
        console.log('Login failed: res:', res);
        alert(
            `Failed to login. 😢 Please ping this to repo owner twitter.com/sivanesh_fiz`
        );
    };

    return (
        <div>
            <GoogleLogin
                clientId={clientId}
                buttonText="Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                style={{ marginTop: '100px' }}
                isSignedIn={true}
            />
            <br/>
            {txt}
        </div>
    );
}

export default Login;
