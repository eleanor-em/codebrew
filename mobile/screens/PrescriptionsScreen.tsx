import * as React from 'react';
import {Button, StyleSheet} from 'react-native';
import 'react-native-gesture-handler';

import {Text, View} from '../components/Themed';
import {StackNavigationHelpers} from "@react-navigation/stack/src/types";

interface PrescriptionsScreenProps {
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
            <Button
                title={"Current"}
                onPress={() => props.navigation.navigate('CurrentPrescriptionsScreen')}
            />
            <Button
                title={"Last Repeats"}
                onPress={() => props.navigation.navigate('LastRepeatScreen')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
