import React from 'react';
import '../static/PatientOTP.scss'
import config from "../../config";

function PatientOTP(props) {
    const [phone, setPhone] = React.useState('');
    const [otp, setOtp] = React.useState('');
    const [otpActive, setOtpActive] = React.useState(true);

    function checkOtp() {
        console.log('verifying ' + phone + ' ' + otp);
        fetch(config.apiUrl + '/accessPatient', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'follow',
            body: JSON.stringify({ sessionToken: props.sessionToken, phone, otp })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.status) {
                    props.receiveAccessToken(data.token);
                }
                if (data.logout) {
                    props.logout();
                }
            });

    }

    React.useEffect(() => {
        if (otp.length === 6) {
            setOtpActive(false);
            setTimeout(() => {
                setOtpActive(true);
            }, 1000);
        }
    }, []);

    return (
        <div className="PatientOTP" style={{block: 'center', textAlign: 'center', padding: '10em'}}>
            <form action="" method="POST" onSubmit={e => {
                e.preventDefault();
                checkOtp();
            }}>
                <label>Enter patient's phone number</label><br/>
                <input type="text" id="pPhone" pattern="[0-9]*" onChange={(event) => {
                    event.target.value = event.target.value.replaceAll(/\D/g, '');
                    setPhone(event.target.value)
                }}/> <br/>
                <br/>
                <label>Enter patient's OTP</label><br/>
                <input disabled={!otpActive} id="pOTP" maxLength='6' onChange={(event) => setOtp(event.target.value)}/>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default PatientOTP;
