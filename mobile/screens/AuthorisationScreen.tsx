import * as React from 'react';
import {StyleSheet} from 'react-native';

import {Text, View} from '../components/Themed';

export default function AuthorisationScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.code}>012345</Text>
            <View style={styles.separator} />
            <Text style={styles.content}>This code authorises your GP or pharmacist to access your prescription information. They can only do so with your consent.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    code: {
        fontSize: 72,
        fontFamily: 'space-mono',
        letterSpacing: 8,
    },
    content: {
        margin: 20,
        fontSize: 16,
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
