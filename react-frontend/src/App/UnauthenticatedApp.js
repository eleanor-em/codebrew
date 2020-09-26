/* Purpose: Control the routes of unauthenticated user. Only allows access to
    Landing Page and Authentication Page to unauthenticated user */

import React from 'react';
import Authentication from './pages/Authentication';

function UnauthenticatedApp(props) {
    return (
        <>
            <a href="#" onClick={() => props.onShowAdmin()}>admin portal</a>
            <Authentication setEmail={props.setEmail} receiveToken={token => props.receiveToken(token)}/>
        </>
    );
}

export default UnauthenticatedApp;
