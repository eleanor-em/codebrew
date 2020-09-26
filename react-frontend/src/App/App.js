/**
 * Purpose: Renders UnauthenticatedApp component if user is not logged in, 
 * else fetch logged-in user data, then pass it as props to AuthenticatedApp 
 * component
 */

import React, { useState, useEffect } from 'react';
import './App.css';
import PatientOTP from './pages/PatientOTP';
import PatientPrescription from './pages/PatientPrescription';
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

// function App (){
//     return (
//        <div className="App">
//          <header className="App-header">
//            <PatientPrescription />
//          </header>
//       </div>
//     )
// }
function App(props) {
    // const [loggedIn, setLoggedIn] = useState(false);
    // const [token, setToken] = useState('');
    const [loggedIn, setLoggedIn] = useState(true);
    const [token, setToken] = useState('f241bdf92eb03f197ee297393ee482714be9c2c2e501bc81c8dd5d90817851ac');

    function logout() {
        setToken('');
        setLoggedIn(false);
    }

    if (loggedIn) {
        return <AuthenticatedApp sessionToken={token} logout={logout} />;
    } else {
        return <UnauthenticatedApp receiveToken={token => {
            setLoggedIn(true);
            setToken(token);
        }}/>;
    }
}

export default App;
