import React, {useState, useEffect} from 'react';
import '../static/PatientOTP.css'

function PatientOTP() {
  
  const [patientPhone, setPatientPhone] = useState('');
  const [patientOTP, setPatientOTP] = useState('');
  const [isEmptyPhone, setIsEmptyPhone] = useState(false);
  const [isEmptyOTP, setIsEmptyOTP] = useState(false);


  useEffect(() => {
    
  })
  
  return (
    <div className="PatientOTP">
        <label>Enter patient's phone number</label><br />
        <input type="text" id="pPhone" onChange={(event) => setPatientPhone(event.target.value)}></input> <br />
        <button onClick={submitPatientPhone}>Submit</button> <br />
        {isEmptyPhone ? <p  style={{color : 'red'}}>This is empty!</p>:<div></div>}

        <label>Enter patient's OTP</label><br />
        <input type="text" id="pOTP" onChange={(event) => setPatientOTP(event.target.value)}></input> <br />
        <button onClick={submitPatientOTP}>Submit</button>
        {isEmptyOTP ? <p  style={{color : 'red'}}>This is empty!</p>:<div></div>}

    </div>
  );

  function submitPatientPhone() {
      if(patientPhone === '') {
        setIsEmptyPhone(true);
      } else {
        setIsEmptyPhone(false);
        alert(patientPhone);
      }
  }

  function submitPatientOTP() {
      if(patientOTP === '') {
        setIsEmptyOTP(true);
      } else {
        setIsEmptyOTP(false);
        alert(patientOTP);
      }
  }
}



export default PatientOTP;
