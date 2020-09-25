import React, {useState, useEffect} from 'react';
import './App.css';

function App() {
  
  const [message, setMessage] = useState('');

  useEffect(() => {
    getMessage();
  })

  function getMessage() {
    fetch('/helloMessage')
      .then(res => res.json())
      .then(data => {
        setMessage(data.message);
      })
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <p>{message}</p>
      </header>
    </div>
  );
}



export default App;
