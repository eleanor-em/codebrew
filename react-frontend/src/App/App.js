/**
 * Purpose: Renders UnauthenticatedApp component if user is not logged in, 
 * else fetch logged-in user data, then pass it as props to AuthenticatedApp 
 * component
 */

import React from 'react';
import './App.css';
import AuthenticatedApp from './AuthenticatedApp';
import UnauthenticatedApp from './UnauthenticatedApp';

// for testing single page PatientOTP
// function App() {
  
//   return (
//     <div className="App">
//       <header className="App-header">
//         <PatientOTP />
//       </header>
//     </div>
//   );
// }
function App() {
    // const [loggedIn, setLoggedIn] = React.useState(false);
    // const [token, setToken] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [loggedIn, setLoggedIn] = React.useState(true);
    const [token, setToken] = React.useState('f241bdf92eb03f197ee297393ee482714be9c2c2e501bc81c8dd5d90817851ac');

    function logout() {
        setToken('');
        setLoggedIn(false);
    }

    if (loggedIn) {
        return <AuthenticatedApp sessionToken={token} logout={logout} email={email}/>;
    } else {
        return <UnauthenticatedApp receiveToken={token => {
            setLoggedIn(true);
            setToken(token);
        }} setEmail={setEmail}/>;
    }
}

export default App;
