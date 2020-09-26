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
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    touchable: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'gray',
        borderWidth: 1,
        width: '100%',
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});