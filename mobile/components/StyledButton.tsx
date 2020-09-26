import * as React from 'react';
import {Text, View} from '../components/Themed';
import {StyleSheet, TouchableOpacity} from "react-native";
import {config} from "../config";

interface StyledButtonProps {
    title: string,
    subtitle?: string,
    onPress(): void,
}

export default function StyledButton(props: StyledButtonProps) {
    return (
        <TouchableOpacity style={styles.touchable} onPress={() => props.onPress()}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{props.title}</Text>
                <Text style={styles.subtitle}>{props.subtitle}</Text>
            </View>
            <Text style={styles.pointer}>〉</Text>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    touchable: {
        textAlign: 'left',
        alignContent: 'space-between',
        flexDirection: 'row',
        flex: 1,
        borderColor: 'gray',
        borderWidth: 1,
        width: '100%',
        padding: 20,
        paddingRight: 0,
        marginTop: 15,
        borderRadius: 4,
    },
    titleContainer: {
        flex: 1,
    },
    title: {
        fontSize: 36,
    },
    subtitle: {
        flex: 1,
        fontSize: 18,
        color: config.warningColour,
        fontStyle: 'italic',
    },
    pointer: {
        textAlign: 'right',
        fontSize: 64,
        paddingLeft: 5,
    }
});