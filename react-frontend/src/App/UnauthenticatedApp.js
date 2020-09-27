/* Purpose: Control the routes of unauthenticated user. Only allows access to
    Landing Page and Authentication Page to unauthenticated user */

import React from 'react';
import Authentication from './pages/Authentication';
import "./static/sass/pages/general.scss"


function UnauthenticatedApp(props) {
    return (
        <>
            <Authentication setRole={props.setRole} setEmail={props.setEmail} receiveToken={token => props.receiveToken(token)}/>
            <div className="user">
                <label>To be used by Admin:</label>
                <a href="#" onClick={() => props.onShowAdmin()}>Add User</a>
            </div>
            {/* <div>
                <h1>Prescript - where drugs are simplified</h1>
            </div> */}
        </>
    );
}

export default UnauthenticatedApp;
