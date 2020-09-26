/**
 * Purpose: Renders UnauthenticatedApp component if user is not logged in, 
 * else fetch logged-in user data, then pass it as props to AuthenticatedApp 
 * component
 */

import React from 'react';
import './App.css';
import AuthenticatedApp from './AuthenticatedApp';
import UnauthenticatedApp from './UnauthenticatedApp';
import AdminPage from "./pages/AdminPage";

function App() {
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [token, setToken] = React.useState('');
    const [showAdmin, setShowAdmin] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const [role, setRole] = React.useState('');

    function logout() {
        setToken('');
        setLoggedIn(false);
        setShowAdmin(false);
    }

    function onShowAdmin() {
        setShowAdmin(true);
    }

    if (showAdmin) {
        return <AdminPage onBack={() => setShowAdmin(false)}/>
    } else if (loggedIn) {
        return <AuthenticatedApp sessionToken={token} logout={logout} email={email} role={role}/>;
    } else {
        return <UnauthenticatedApp onShowAdmin={onShowAdmin} receiveToken={token => {
            setLoggedIn(true);
            setToken(token);
        }} setEmail={setEmail} setRole={setRole}/>;
    }
}

export default App;
