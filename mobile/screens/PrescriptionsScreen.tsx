import * as React from 'react';
import {Button, StyleSheet} from 'react-native';
import 'react-native-gesture-handler';

import {Text, View} from '../components/Themed';
import {StackNavigationHelpers} from "@react-navigation/stack/src/types";
import StyledButton from "../components/StyledButton";

import * as SecureStore from 'expo-secure-store';
import {Prescription} from "../types";

interface PrescriptionsScreenProps {
    navigation: StackNavigationHelpers,
    patientName: string,
    prescriptions: Prescription[],
}

export default function PrescriptionsScreen(props: PrescriptionsScreenProps) {
    const lastRepeats = props.prescriptions.filter(prescription => prescription.currentRepeat == prescription.totalRepeats);
    let subtitle = '';
    if (lastRepeats) {
        const len = lastRepeats.length;
        subtitle = len + ' prescription' + (len == 1 ? ' is on its' : 's are on their') + ' last repeat.'
    }

    return (
        <View style={styles.container}>
            <Text>Welcome, {props.patientName}.</Text>
            <View style={styles.buttonContainer}>
                <StyledButton
                    title={"Current"}
                    onPress={() => props.navigation.navigate('CurrentPrescriptionsScreen')}
                />
                <StyledButton
                    title={"Last Repeats"}
                    subtitle={subtitle}
                    onPress={() => props.navigation.navigate('LastRepeatScreen')}
                />
            </View>
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
