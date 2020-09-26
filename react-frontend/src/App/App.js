/**
 * Purpose: Renders UnauthenticatedApp component if user is not logged in, 
 * else fetch logged-in user data, then pass it as props to AuthenticatedApp 
 * component
 */

import React, { useState, useEffect } from 'react';
import './App.css';
import PatientOTP from './pages/PatientOTP';
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
function App(props) {
    const [loggedIn, setLoggedIn] = useState(false);
    const [token, setToken] = useState('');

    if (loggedIn) {
        return <AuthenticatedApp user={token} />;
    } else {
        return <UnauthenticatedApp receiveToken={token => {
            setLoggedIn(true);
            setToken(token);
        }}/>;
    }
}

export default App;
