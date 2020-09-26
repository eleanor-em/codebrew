import React from 'react';

function PatientPrescription(props) {
    const [drugName, setDrugName] = React.useState('');
    const [numberOfPills, setNumberOfPills] = React.useState(0);
    const [frequency, setFrequency] = React.useState('');
    const [duration, setDuration] = React.useState('');
    const [totalRepeats, setTotalRepeats] = React.useState(0);
    const [currentRepeat, setCurrentRepeat] = React.useState(0);
    
    function addPrescription() {
        console.log('add prescription');
        fetch('http://localhost:5000/addPrescription', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ sessionToken: props.sessionToken, 
                accessToken: props.accessToken, drugName, numberOfPills, frequency, duration, totalRepeats, currentRepeat})
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.status) {
                    console.log('success');
                }
            })
    }

    return (
        <div className="PatientPrescription" style={{block: 'center', textAlign: 'center', padding: '10em'}}>
            <form action="" method="POST" onSubmit={e => {
                e.preventDefault();
                addPrescription()
            }}>
                <label>Enter the name of the drug</label><br/>
                <input type="text" id="fDrugName" onChange={(event) => {
                    setDrugName(event.target.value)
                }}/> <br/>
                <br/>
                <label>Enter the number of pills</label><br/>
                <input type="text" id="fNumberOfPills" pattern="[0-9]*" onChange={(event) => {
                    event.target.value = event.target.value.replaceAll(/\D/g, '');
                    setNumberOfPills(event.target.value)
                }}/> <br/>
                <br/>
                <label>Enter the frequency</label><br/>
                <input type="text" id="fFrequency" onChange={(event) => {
                    setFrequency(event.target.value)
                }}/> <br/>
                <br/>
                <label>Enter the duration</label><br/>
                <input type="text" id="fDuration" onChange={(event) => {
                    setDuration(event.target.value)
                }}/> <br/>
                <br/>
                <label>Enter the total repeats</label><br/>
                <input type="text" id="fTotalRepeats" pattern="[0-9]*" onChange={(event) => {
                    event.target.value = event.target.value.replaceAll(/\D/g, '');
                    setTotalRepeats(event.target.value)
                }}/> <br/>
                 <label>Enter the current repeat</label><br/>
                <input type="text" id="fCurrentRepeat" pattern="[0-9]*" onChange={(event) => {
                    event.target.value = event.target.value.replaceAll(/\D/g, '');
                    setCurrentRepeat(event.target.value)
                }}/> <br/>
                <button type="submit">Submit</button>
            </form>
            
        </div>
    )
}

export default PatientPrescription;
