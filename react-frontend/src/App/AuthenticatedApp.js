/* Purpose: Controls the routes of authenticated users. Allows access to
Profile Page, FamilyManagement Page and Home Page (User Panel) */

import React from 'react';
import PatientOTP from "./pages/PatientOTP";
import PatientPrescriptions from "./pages/PatientPrescriptions";

function AuthenticatedApp(props) {
    const [hasAccessToken, setHasAccessToken] = React.useState(false);
    const [accessToken, setAccessToken] = React.useState('');

    function receiveAccessToken(token) {
        console.log('access token: ' + token);
        setAccessToken(token);
        setHasAccessToken(true);
    }

    function logout() {
        props.logout();
    }

    if (!hasAccessToken) {
        return (
            <div id="main-page-background">
                <div className="user">
                    Logged in as: {props.email}
                    <div><a href="#" onClick={logout}>logout</a></div>
                </div>
                
                <PatientOTP logout={logout} sessionToken={props.sessionToken} receiveAccessToken={receiveAccessToken}/>
            </div>
        );
    } else {
        return (
            <div id="main-page-background">
                <div className="user">
                    Logged in as: {props.email}
                    <div><a href="#" onClick={logout}>logout</a></div>
                </div>
                <PatientPrescriptions role={props.role} onExpired={() => setHasAccessToken(false)} sessionToken={props.sessionToken} accessToken={accessToken} />
            </div>
        );
    }
}

export default AuthenticatedApp;
