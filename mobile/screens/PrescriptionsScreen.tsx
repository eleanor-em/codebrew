import * as React from 'react';
import {Button, StyleSheet} from 'react-native';
import 'react-native-gesture-handler';

import {Text, View} from '../components/Themed';
import {StackNavigationHelpers} from "@react-navigation/stack/src/types";
import StyledButton from "../components/StyledButton";

import * as SecureStore from 'expo-secure-store';

interface PrescriptionsScreenProps {
    patientName: string,
    navigation: StackNavigationHelpers;
}

export default function PrescriptionsScreen(props: PrescriptionsScreenProps) {
    // This screen just leads to the sub-screens.
    //
    // CurrentPrescriptions should display a list of all of the prescriptions the user currently has. Tap the prescription
    // to display a detailed view with more records etc.
    //
    // LastRepeat should show the list of prescriptions that are on their last repeat. If this isn't 0, the button
    // should show a warning icon of some kind.
    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <StyledButton
                    title={"Current"}
                    onPress={() => props.navigation.navigate('CurrentPrescriptionsScreen')}
                />
                <StyledButton
                    title={"Last Repeats"}
                    onPress={() => props.navigation.navigate('LastRepeatScreen')}
                />
            </View>
            <Button onPress={() => {
                async function doDeletion() {
                    await SecureStore.deleteItemAsync('pin');
                    await SecureStore.deleteItemAsync('name');
                    await SecureStore.deleteItemAsync('patientKey');
                }
                doDeletion();
            }} title="[DEBUG] Delete Patient Data"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        display: 'flex',
        width: '100%',
        height: '80%',
        padding: 3,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
