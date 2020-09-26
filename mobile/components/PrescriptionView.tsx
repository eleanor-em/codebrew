import React from 'react';
import {Text, View} from './Themed';
import {Prescription} from "../types";
import {StyleSheet} from "react-native";
import {config} from "../config";

interface PrescriptionViewProps {
    prescription: Prescription
}

export default function PrescriptionView(props: PrescriptionViewProps) {
    let color = '#ffffff';
    if (props.prescription.totalRepeats == props.prescription.currentRepeat) {
        color = config.warningColour;
    }

    return (
        <View style={styles.container}>
            <View style={styles.inner}>
                <Text style={styles.title}>{props.prescription.drug.name}</Text>
                <Text style={{...styles.subtitle, color}}>Repeat {props.prescription.currentRepeat}/{props.prescription.totalRepeats}</Text>
                <Text>Take {props.prescription.numberOfPills} {props.prescription.frequency}{
                    props.prescription.duration != '-' && (' ' + props.prescription.duration)
                }.</Text>
            </View>
            <View style={styles.expiryDate}>
                <Text style={styles.subtitle}>Expires {props.prescription.expiry.toDateString()}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        textAlign: 'left',
        alignContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
        padding: 5,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        paddingBottom: 30,
        paddingRight: 'auto',
    },
    inner: {
        flex: 1,
        flexDirection: 'column',
    },
    expiryDate: {
        flexDirection: 'column',
        textAlign: 'right',
    },
    title: {
        fontSize: 20,
    },
    subtitle: {
        fontSize: 14,
        fontStyle: 'italic',
    },
});
