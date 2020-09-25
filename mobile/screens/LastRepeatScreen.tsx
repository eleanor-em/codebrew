import * as React from 'react';
import { StyleSheet } from 'react-native';
import 'react-native-gesture-handler';

import { Text, View } from '../components/Themed';

export default function LastRepeatScreen() {
    return (
        <View style={styles.container}>
            <Text>Last Repeats</Text>
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
