/* Purpose: Control the routes of unauthenticated user. Only allows access to
    Landing Page and Authentication Page to unauthenticated user */

    import React from 'react';
    import { Route, Switch } from 'react-router-dom';
    import Authentication from './pages/Authentication';
    
    function UnauthenticatedApp() {
    
        return (
            <Switch>
                <Route exact path="/" component={ Authentication }/>
            </Switch>
        )
    }
    
    export default UnauthenticatedApp;
    