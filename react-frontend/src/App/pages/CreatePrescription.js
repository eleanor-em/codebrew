import React from 'react';

function CreatePrescription(props) {
    const [drugName, setDrugName] = React.useState(props.drugs.length > 0 ? props.drugs[0].name : '');
    const [numberOfPills, setNumberOfPills] = React.useState(0);
    const [frequency, setFrequency] = React.useState('');
    const [duration, setDuration] = React.useState('');
    const [totalRepeats, setTotalRepeats] = React.useState(0);

    function addPrescription() {
        if (drugName && drugName !== '--' && numberOfPills != 0 && totalRepeats != 0 && frequency) {
            fetch('http://localhost:5000/addPrescription', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    sessionToken: props.sessionToken,
                    accessToken: props.accessToken, drugName, numberOfPills, frequency, duration, totalRepeats
                })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.status) {
                        alert('Successfully added prescription.');
                        props.fetchPrescriptions();
                    } else {
                        alert('Failed to add prescription.');
                    }
                })
        } else {
            alert('Please ensure all fields are valid.');
        }
    }

    return (
        <div className="PatientPrescription" style={{block: 'center', textAlign: 'center', padding: '10em'}}>
            <h3>Add new prescription</h3>
            <form action="" method="POST" onSubmit={e => {
                e.preventDefault();
                addPrescription()
            }}>
                <label>Enter the name of the drug</label><br/>
                <select onChange={(event) => {
                    setDrugName(event.target.value)
                }}>
                    <option value="--">--</option>
                    {props.drugs.map(drug => (
                        <option key={drug.name} value={drug.name}>{drug.name}</option>
                    ))}
                </select><br/>
                <br/>
                <label>Enter the number of pills</label><br/>
                <input type="text" id="fNumberOfPills" pattern="[0-9]*" onChange={(event) => {
                    event.target.value = event.target.value.replaceAll(/\D/g, '');
                    setNumberOfPills(parseInt(event.target.value))
                }}/> <br/>
                <br/>
                <label>Enter the frequency</label><br/>
                <input type="text" id="fFrequency" onChange={(event) => {
                    setFrequency(event.target.value)
                }}/> <br/>
                <br/>
                <label>Enter the duration to take the drug</label><br/>
                <input type="text" id="fDuration" onChange={(event) => {
                    setDuration(event.target.value)
                }}/> <br/>
                <br/>
                <label>Enter the number of repeats</label><br/>
                <input type="text" id="fTotalRepeats" pattern="[0-9]*" onChange={(event) => {
                    event.target.value = event.target.value.replaceAll(/\D/g, '');
                    setTotalRepeats(parseInt(event.target.value))
                }}/> <br/>
                <button type="submit">Submit</button>
            </form>
            
        </div>
    )
}

export default CreatePrescription;
