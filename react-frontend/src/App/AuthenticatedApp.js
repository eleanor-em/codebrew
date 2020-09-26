/* Purpose: Controls the routes of authenticated users. Allows access to
Profile Page, FamilyManagement Page and Home Page (User Panel) */

import React from 'react';
import PatientOTP from "./pages/PatientOTP";
import PatientPrescriptions from "./pages/PatientPrescriptions";

function AuthenticatedApp(props) {
    // const [hasAccessToken, setHasAccessToken] = React.useState(false);
    // const [accessToken, setAccessToken] = React.useState('');
    // const [role, setRole] = React.useState('');
    const [hasAccessToken, setHasAccessToken] = React.useState(true);
    const [accessToken, setAccessToken] = React.useState('669b27612ceb7b61425aab0c88eec2081cdb9d0aaf570943d9507701c90a06ec');
    const [role, setRole] = React.useState('GP');

    function receiveAccessToken(token) {
        console.log('access token: ' + token);
        setHasAccessToken(true);
        setAccessToken(token);
    }

    function logout() {
        props.logout();
    }

    if (!hasAccessToken) {
        return (
            <>
                <div>Logged in as: {props.email}</div>
                <div><a href="#" onClick={logout}>logout</a></div>
                <PatientOTP logout={logout} sessionToken={props.sessionToken} receiveAccessToken={receiveAccessToken} setRole={setRole}/>
            </>
        );
    } else {
        return (
            <>
                <div>Logged in as: {props.email}</div>
                <div><a href="#" onClick={logout}>logout</a></div>
                <PatientPrescriptions role={role} onExpired={() => setHasAccessToken(false)} accessToken={accessToken} />
            </>
        );
    }
}

export default AuthenticatedApp;
