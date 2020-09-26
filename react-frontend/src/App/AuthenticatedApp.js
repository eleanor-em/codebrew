/* Purpose: Controls the routes of authenticated users. Allows access to
Profile Page, FamilyManagement Page and Home Page (User Panel) */

import React from 'react';
import PatientOTP from "./pages/PatientOTP";

function AuthenticatedApp(props) {
    const [hasAccessToken, setHasAccessToken] = React.useState(false);
    const [accessToken, setAccessToken] = React.useState('');

    function receiveAccessToken(token) {
        setHasAccessToken(true);
        setAccessToken(token);
    }

    function logout() {
        props.logout();
    }

    if (!hasAccessToken) {
        return (
            <PatientOTP logout={logout} sessionToken={props.sessionToken} receiveAccessToken={receiveAccessToken}/>
        );
    } else {
        return (<div>placeholder</div>);
    }
}

export default AuthenticatedApp;
