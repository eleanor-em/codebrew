/**
 * Purpose: Renders UnauthenticatedApp component if user is not logged in, 
 * else fetch logged-in user data, then pass it as props to AuthenticatedApp 
 * component
 */

import React, { useState, useEffect } from 'react';
import './App.css';
import AuthenticatedApp from './AuthenticatedApp';
import UnauthenticatedApp from './UnauthenticatedApp';

function App(props) {

    // const loggedIn = false;
    
    const [loading, setLoading] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState({});

    useEffect(() => {
        handleAuthentication();
    });

    // If the user logs in with correct information, fetch the user data,
    // and switch from UnauthenticatedApp component to AuthenticatedApp 
    // component to be rendered.
    function handleAuthentication() {
        fetch('http://localhost:5000/validateLogin')
        .then(res => res.json())
        .then(data => {
            if (data.result.isLoggedIn) {
                setLoggedIn(true);

                fetch('/user')
                .then(res => res.json())
                .then(user => {
                    setUser(user);
                    setLoading(false);
                })
            } else {
                setLoading(false);
            }
        });
    }

    /* if (loading) {
        return <div>Loading...</div>
    } */

    // return <UnauthenticatedApp />;

    if (loggedIn) {
        return <AuthenticatedApp user={user} />;
    } else {
        return <UnauthenticatedApp />;
    }
}

export default App;
