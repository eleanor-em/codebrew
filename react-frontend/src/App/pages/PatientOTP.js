import React, {useState, useEffect} from 'react';
import '../static/PatientOTP.scss'

function PatientOTP() {
  
  const [patientPhone, setPatientPhone] = useState('');
  const [patientOTP, setPatientOTP] = useState('');
  const [isEmptyPhone, setIsEmptyPhone] = useState(false);
  const [userNotFound, setUserNotFound] = useState(false);
  // const [isEmptyOTP, setIsEmptyOTP] = useState(false);


  useEffect(() => {
    if(patientOTP.length === 6) {
      console.log(patientOTP);
      document.getElementById("pOTP").disabled = true;
      setTimeout(() => {
        document.getElementById("pOTP").disabled = false;
      }, 1000);
    }
  })
  
  return (
    <div className="PatientOTP">
      <div className="PhoneNumberField">
        <label>Enter patient's phone number</label><br />
        <input type="text" id="pPhone" onChange={(event) => setPatientPhone(event.target.value)}></input> <br />
        <button id="btnPhone" onClick={submitPatientPhone}>Submit</button> <br />
        {isEmptyPhone ? <p  style={{color : 'red'}}>This is empty!</p>:<div></div>}
        {userNotFound ? <p style={{color: 'red'}}>There is no patient with this phone number</p> : <div></div>}
      </div>
        <label>Enter patient's OTP</label><br />
        <input id="pOTP" maxLength='6' onChange={(event) => setPatientOTP(event.target.value)}/>

    </div>
  );

  function submitPatientPhone() {
      if(patientPhone === '') {
        setIsEmptyPhone(true);
      } else {
        setIsEmptyPhone(false);
        getTOTP({phone: patientPhone});

      }
  }

  function getTOTP(data) {
    var url = 'http://localhost:5000/totp';
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then(response => {
        if (response.status === false) {
          setUserNotFound(true)
        } else {
          setUserNotFound(false)
          console.log(response);
        }
    })
    .catch(error => console.error('Error:', error));
  }

 

}

export default PatientOTP;
