import * as React from 'react';
import {Text, View} from '../components/Themed';
import {StyleSheet, TouchableOpacity} from "react-native";

interface StyledButtonProps {
    title: String,
    onPress(): void,
}

export default function StyledButton(props: StyledButtonProps) {
    return (
        <TouchableOpacity style={styles.touchable} onPress={() => props.onPress()}>
            <Text style={styles.title}>{props.title}</Text>
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
        marginTop: 15,
        marginBottom: 15,
    },
    title: {
        flex: 1,
        fontSize: 36,
        alignSelf: 'center',
    },
    pointer: {
        alignSelf: 'center',
        textAlign: 'right',
        fontSize: 64,
    }
});