import * as React from 'react';
import {StyleSheet} from 'react-native';

import {Text, View} from '../components/Themed';
import {PatientDataProps} from "../types";
import {totp, totpEpoch, totpTimeElapsed} from "../utils";

export default function AuthorisationScreen(props: PatientDataProps) {
    const [authCode, setAuthCode] = React.useState('');
    const [elapsed, setTillNext] = React.useState(0);
    const [epoch, setEpoch] = React.useState(0);

    async function resetAuthCode() {
        const code = await totp(props.patientData.patientKey);
        console.log('new code: ' + code);
        setAuthCode(code);
    }

    React.useEffect(() => {
        resetAuthCode();
    }, [ epoch ]);

    React.useEffect(() => {
        const timer = setInterval(() => {
            if (epoch != totpEpoch()) {
                setEpoch(totpEpoch());
            }
            setTillNext(totpTimeElapsed());
        }, 200);
        return () => clearInterval(timer);
    }, []);

    const width = (100 * (elapsed / 30)) + '%';

    return (
        <View style={styles.container}>
            <Text style={styles.code}>{authCode}</Text>
            <View style={{...styles.indicator, width }}/>
            <View style={styles.separator} />
            <Text style={styles.content}>This code authorises your GP or pharmacist to access your prescription information for the next hour. They can only do so with your consent.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    code: {
        fontSize: 72,
        fontFamily: 'space-mono',
        letterSpacing: 8,
    },
    content: {
        margin: 20,
        fontSize: 16,
    },
    indicator: {
        height: 2,
        borderWidth: 1,
        borderColor: '#34a4eb',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
