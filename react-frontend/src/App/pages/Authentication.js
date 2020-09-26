/* Purpose: Renders a login form or signup form depending on the user */

import React, { useState } from 'react';
import { LoginForm} from '../components/Form';
import '../static/sass/pages/authentication.scss';

function Authentication(props) {

    // const [ displayLogin, setDisplayLogin ] = useState(true);
    // const [loading, setLoading] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState({});

    /* function handleClickLogin() {
        setDisplayLogin(true);
    } */

    function handleClickLogin() {
        fetch('http://localhost:5000/validateLogin')
        .then(res => res.json())
        .then(data => {
            debugger
            console.log(data)
            if (data.result.isLoggedIn) {
                setLoggedIn(true);

                fetch('/user')
                .then(res => res.json())
                .then(user => {
                    setUser(user);
                    // setLoading(false);
                })
            } else {
                // setLoading(false);
            }
        });
    }

    return (
        <div id="main-page-background">       
            { <LoginForm login={handleClickLogin}/> }
        </div>
    );
}

export default Authentication;

/* 
// <a class="arrow-image" href="/"><img src="/images/arrow.jpg" width="80px" alt='arrow'></img></a> */
