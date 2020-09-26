import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import {Navigation} from './navigation';
import * as SecureStore from "expo-secure-store";
import {Text, View} from './components/Themed';
import * as Api from './api';
import RegisterScreen from "./screens/RegisterScreen";
import {Alert} from "react-native";
import PinVerifyForm from "./components/PinVerifyForm";
import {config} from "./config";
import {Prescription} from "./types";

export default function App() {
    // Load fonts etc.
    const isLoadingComplete = useCachedResources();
    const colorScheme = useColorScheme();

    const [checkedForPin, setCheckedForPin] = React.useState(false);
    const [hasPin, setHasPin] = React.useState(false);
    const [pin, setPin] = React.useState('');
    const [pinValidated, setPinValidated] = React.useState(false);
    const [triedPin, setTriedPin] = React.useState(false);
    const [ready, setReady] = React.useState(false);

    const [name, setName] = React.useState('');
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [patientKey, setPatientKey] = React.useState('');

    const [prescriptions, setPrescriptions] = React.useState([] as Prescription[]);

    // Check if there is a PIN in storage
    React.useEffect(() => {
        async function checkForPin() {
            const pin = await SecureStore.getItemAsync('pin');
            setCheckedForPin(true);

            if (pin != null) {
                setHasPin(true);
                setPin(pin);
            } else {
                setHasPin(false);
            }
        }

        checkForPin();
    }, []);

    // Callback for when the user first registers
    function onRegistered(name: string, phoneNumber: string, patientKey: string) {
        setHasPin(true);
        setName(name);
        setPhoneNumber(phoneNumber);
        setPatientKey(patientKey);
        setPinValidated(true);
        setReady(true);
    }

    // Callback for when the user enters a PIN to verify
    function onPinEntered(enteredPin: string) {
        async function loadRestOfData() {
            const name = await SecureStore.getItemAsync('name');
            const phoneNumber = await SecureStore.getItemAsync('phoneNumber');
            const patientKey = await SecureStore.getItemAsync('patientKey');

            if (name != null && phoneNumber != null && patientKey != null) {
                setName(name);
                setPhoneNumber(phoneNumber);
                setPatientKey(patientKey);
                setReady(true);
                updatePrescriptions(phoneNumber, patientKey);
            } else {
                Alert.alert('Failed to fetch user data. Perhaps try restarting the app?');
            }
        }

        if (pin == enteredPin) {
            setPinValidated(true);
            loadRestOfData();
        } else {
            setTriedPin(true);
        }
    }

    function updatePrescriptions(phoneNumber: string, patientKey: string) {
        async function getData() {
            const { status, prescriptions } = await Api.getPrescriptions(phoneNumber, patientKey);
            if (status) {
                setPrescriptions(prescriptions);
            } else {
                alert('Failed to retrieve your prescriptions. Is your internet disconnected?');
            }
        }
        getData();
    }

    // Repeatedly check prescription data
    React.useEffect(() => {
        const timer = setInterval(() => {
            updatePrescriptions(phoneNumber, patientKey);
        }, config.pollFrequency);
        return () => clearInterval(timer);
    }, []);

    if (!isLoadingComplete) {
        return null;
    } else if (!checkedForPin) {
        // If we haven't managed to check the presence of our credentials, tell the user to wait.
        return (
            <SafeAreaProvider>
                <View>
                    <Text>Loading user data...</Text>
                </View>
            </SafeAreaProvider>
        );
    } else if (!hasPin) {
        // User needs to register
        return (
            <SafeAreaProvider>
                <RegisterScreen onRegistered={onRegistered}/>
            </SafeAreaProvider>
        );
    } else if (!pinValidated) {
        return (
            <SafeAreaProvider>
                <PinVerifyForm enteredIncorrect={triedPin} onPinEntered={onPinEntered}/>
            </SafeAreaProvider>
        );
    } else if (!ready) {
        return (
            <SafeAreaProvider>
                <View>
                    <Text>Loading...</Text>
                </View>
            </SafeAreaProvider>
        );
    } else {
        return (
            <SafeAreaProvider>
                <Navigation
                    colorScheme={colorScheme}
                    patientData={{
                        name,
                        phoneNumber,
                        patientKey
                    }}
                    prescriptions={prescriptions}
                />
                <StatusBar/>
            </SafeAreaProvider>
        );
    }
}
