import React from 'react';
import {Alert, StyleSheet} from 'react-native';
import {Text, View} from '../components/Themed';
import RegisterForm from "../components/RegisterForm";
import SmsPasscodeForm from "../components/SmsPasscodeForm";
import PinRegisterForm from '../components/PinRegisterForm';
import * as Api from '../api';
import * as SecureStore from 'expo-secure-store';

enum RegisterState {
    Init,
    EnterSmsPasscode,
    CreatePin,
};

interface RegisterScreenProps {
    onRegistered(name: string, phoneNumber: string, patientKey: string): void,
}

export default function RegisterScreen(props: RegisterScreenProps) {
    const [registerState, setRegisterState] = React.useState(RegisterState.Init);
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [name, setName] = React.useState('');
    const [patientKey, setPatientKey] = React.useState('');

    function onPatientData(phoneNumber: string, name: string) {
        async function registerPatient() {
            try {
                if (await Api.registerPatient(phoneNumber, name)) {
                    setName(name);
                    setPhoneNumber(phoneNumber);
                    setRegisterState(RegisterState.EnterSmsPasscode);
                } else {
                    Alert.alert('Failed to register user');
                }
            } catch (_) {
                Alert.alert('Failed to connect to server');
            }
        }

        registerPatient();
    }

    function onCodeEntered(code: string) {
        async function checkCodeValid() {
            const receivedKey = await Api.checkSmsCode(phoneNumber, code);
            if (receivedKey != null) {
                setPatientKey(receivedKey);
                setRegisterState(RegisterState.CreatePin);
            } else {
                Alert.alert('Code incorrect. Please try again.');
            }
        }

        checkCodeValid();
    }

    function onPinEntered(pin: string) {
        // Save patient data locally
        async function savePatientData() {
            await SecureStore.setItemAsync('name', name);
            await SecureStore.setItemAsync('phoneNumber', phoneNumber);
            await SecureStore.setItemAsync('patientKey', patientKey);
            await SecureStore.setItemAsync('pin', pin);
            props.onRegistered(name, phoneNumber, patientKey);
        }
        savePatientData();
    }

    function createForm() {
        switch (registerState) {
            case RegisterState.Init:
                return (
                    <RegisterForm onPatientData={(phoneNumber, name) => onPatientData(phoneNumber, name)}/>
                );
            case RegisterState.EnterSmsPasscode:
                return (
                    <SmsPasscodeForm
                        onCodeEntered={code => onCodeEntered(code)}
                        onBack={() => setRegisterState(RegisterState.Init)}
                        phoneNumber={phoneNumber}
                    />
                );
            case RegisterState.CreatePin:
                return (
                    <PinRegisterForm onPinEntered={pin => onPinEntered(pin)} />
                );
        }
    }

    return (
        <View style={styles.container}>
            {createForm()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        padding: 20,
        paddingBottom: 'auto',
        height: '100%',
    },
    textInput: {
        padding: 10,
        margin: 10,
        color: 'white',
        fontSize: 28,
        marginBottom: 20,
    },
    heading: {
        fontSize: 48,
        paddingBottom: 100,
    }
});
