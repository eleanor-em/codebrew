/* Purpose: Renders a login form or signup form depending on the user */

import React, { useState } from 'react';
import { LoginForm} from '../components/Form';
import '../static/sass/pages/authentication.scss';

function Authentication(props) {
    function handleClickLogin(email, password) {
        console.log('logging in as: ' + email);
        fetch('http://localhost:5000/login', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'follow',
            body: JSON.stringify({ email, password })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if (data.status) {
                console.log(props.receiveToken);
                props.receiveToken(data.sessionToken);
            }
        });
    }

    return (
        <div id="main-page-background">       
            { <LoginForm handleClickLogin={handleClickLogin}/> }
        </div>
    );
}

export default Authentication;

/* 
// <a class="arrow-image" href="/"><img src="/images/arrow.jpg" width="80px" alt='arrow'></img></a> */
