import * as React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import 'react-native-gesture-handler';

import { Text, View } from '../components/Themed';
import {Prescription} from "../types";
import PrescriptionView from "../components/PrescriptionView";

interface LastRepeatScreenProps {
    prescriptions: Prescription[],
}

export default function LastRepeatScreen(props: LastRepeatScreenProps) {
    const prescriptions = props.prescriptions.filter(prescription => prescription.currentRepeat == prescription.totalRepeats);
    let count = 0;

    return (
        <View style={styles.container}>
            <FlatList
                data={prescriptions.map(prescription => { return {...prescription, key: (count += 1).toString()} })}
                renderItem={({item}) => <PrescriptionView prescription={item}/>}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        width: '100%',
        paddingRight: 'auto',
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
