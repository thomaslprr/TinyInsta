import React, {useState} from 'react';
import Router from 'next/router'
import { GoogleLogin } from 'react-google-login';
import axios from "axios";

// refresh token
import { refreshTokenSetup } from '../utils/refreshToken';


function Login() {

    const [txt,setTxt] = useState("Veuillez vous connecter avec google !");

    const onSuccess = (res) => {
        console.log(res);
        localStorage.setItem('email', res.profileObj.email);
        localStorage.setItem('token', res.tokenId);
        refreshTokenSetup(res);
        axios.post('https://tinygram2021.appspot.com/_ah/api/myApi/v1/friend/'+res.profileObj.email,res.profileObj )
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });

        setTxt("Chargement de la page... Veuillez patienter")
        Router.push('/');
    };

    const onFailure = (res) => {
        console.log('Login failed: res:', res);
        alert(
            `Failed to login. 😢 `
        );
    };

    return (
        <div>
            <GoogleLogin
                clientId={process.env.client_id}
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
