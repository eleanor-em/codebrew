import React from 'react';

export default function PatientPrescriptions(props) {
    const [prescriptions, setPrescriptions] = React.useState([]);

    const {onExpired, accessToken} = props;

    React.useEffect(() => {
        fetch('http://localhost:5000/getPrescriptions', {
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
                console.log(data)
                if (data.status) {
                    setPrescriptions(data.prescriptions);
                }
                if (data.expired) {
                    onExpired();
                }
            });
    }, []);

    return (
        <div>
            <ul>
                {prescriptions.map(prescription => {
                    return (
                        <div>
                            <div style={styles.top}>
                                <div style={styles.inner}>
                                    <span style={styles.title}>{prescription.drug.name}</span>
                                    <span
                                        style={styles.subtitle}>Repeat {prescription.currentRepeat}/{prescription.totalRepeats}</span>
                                </div>
                                <div style={styles.expiryDate}>
                                    <span
                                        style={styles.subtitle}>Expires {prescription.expiry.toDateString()}</span>
                                </div>
                            </div>
                            <div style={styles.top}>
                            <span
                                style={styles.inner}>Take {prescription.numberOfPills} {prescription.frequency}{
                                props.prescription.duration !== '-' && (' for ' + prescription.duration)
                            }.</span>
                            </div>
                        </div>
                    )
                })}
            </ul>
            {props.role && (
                <form>

                </form>
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
        textAlign: 'right',
    },
    title: {
        fontSize: 26,
    },
    subtitle: {
        fontSize: 16,
        fontStyle: 'italic',
    },
};