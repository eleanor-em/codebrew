import React from 'react';
import CreatePrescription from "./CreatePrescription";
import config from "../config";

export default function PatientPrescriptions(props) {
    const [prescriptions, setPrescriptions] = React.useState([]);
    const [drugs, setDrugs] = React.useState([]);
    const [patient, setPatient] = React.useState([]);
    const [dispensing, setDispensing] = React.useState(false);

    const {onExpired, accessToken} = props;

    React.useEffect(() => {
        fetch(config.apiUrl + '/allDrugs', {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'follow',
        }).then(res => res.json())
        .then(data => {
            if (data.status) {
                setDrugs(data.drugs);
            }
        })
    }, []);

    function fetchPrescriptions() {
        fetch(config.apiUrl + '/getPrescriptions', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'follow',
            body: JSON.stringify({accessToken})
        })
            .then(res => res.json())
            .then(data => {
                if (data.status) {
                    setPrescriptions(data.prescriptions);
                    setPatient(data.patient);
                }
                if (data.expired) {
                    onExpired();
                }
            });
    }

    React.useEffect(() => {
        fetchPrescriptions();
        window.scrollTo(0, 0);
    }, []);

    function dispensePrescription(id) {
        setDispensing(true);

        fetch(config.apiUrl + '/dispense', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'follow',
            body: JSON.stringify({sessionToken: props.sessionToken, accessToken, prescription: id})
        })
            .then(res => res.json())
            .then(data => {
                if (data.status) {
                    setDispensing(false);
                    alert('Successfully dispensed.');
                    fetchPrescriptions();
                }
                if (data.expired) {
                    onExpired();
                }
            });
    }

    return (
        <div>
            <br/><br/><br/><br/>
            <h3 className="tag-line">Viewing prescriptions for {patient}</h3>
            <ul>
                {prescriptions.map(prescription => {
                    return (
                        <li key={prescription._id}>
                            <div style={styles.top}>
                                <div style={styles.inner}>
                                    <span style={styles.title}>{prescription.drug.name}</span>
                                    <br/>
                                    <span
                                        style={styles.subtitle}>Repeat {prescription.currentRepeat}/{prescription.totalRepeats}</span>
                                </div>
                                <div style={styles.expiryDate}>
                                    <span
                                        style={styles.subtitle}>Expires {prescription.expiryDate}</span>
                                </div>
                            </div>
                            <div style={styles.top}>
                            <span
                                style={styles.inner}>Take {prescription.numberOfPills} {prescription.frequency}{
                                prescription.duration && (' for ' + prescription.duration)
                            }.</span>
                            </div>
                            {props.role === 'pharmacist' && (
                                <button onClick={() => dispensePrescription(prescription._id)} disabled={dispensing}>Dispense</button>
                            )}
                        </li>
                    )
                })}
            </ul>
            {props.role === 'GP' && (
                <CreatePrescription fetchPrescriptions={fetchPrescriptions} drugs={drugs} accessToken={accessToken} sessionToken={props.sessionToken}/>
            )}
        </div>
    );
}

const styles = {
    top: {
        flexDirection: 'row',
    },
    container: {
        textAlign: 'left',
        alignContent: 'space-between',
        flexDirection: 'column',
        width: '100%',
        padding: 5,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        paddingBottom: 30,
        paddingRight: 'auto',
    },
    underlined: {
        textDecorationLine: 'underline',
    },
    inner: {
        flex: 1,
        flexDirection: 'column',
        fontSize: 18,
    },
    expiryDate: {
        flexDirection: 'column',
    },
    title: {
        fontSize: 26,
    },
    subtitle: {
        fontSize: 16,
        fontStyle: 'italic',
    },
};