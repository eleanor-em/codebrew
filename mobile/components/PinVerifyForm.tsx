import React, {useEffect} from 'react';
import {Alert, StyleSheet} from 'react-native';
import {Text, View} from '../components/Themed';
import {Button, TextInput} from 'react-native';
import {Formik} from 'formik';
import {isNumber} from "../utils";

interface PinFormProps {
    enteredIncorrect: boolean,
    onPinEntered(pin: string): void,
}

export default function PinVerifyForm(props: PinFormProps) {
    return (
        <Formik
            initialValues={{ pin: '' }}
            onSubmit={() => {}}
        >
            {({resetForm, handleChange, handleBlur, handleSubmit, values}) => (
                <View style={styles.container}>
                    <Text>Please enter your 4-digit PIN.</Text>
                    {props.enteredIncorrect && (
                        <Text style={styles.warning}>The PIN you entered was incorrect. Please try again.</Text>
                    )}
                    <TextInput
                        autoFocus={true}
                        style={styles.numberInput}
                        autoCompleteType="tel"
                        keyboardType="numeric"
                        onChangeText={value => {
                            if (value.length == 4) {
                                handleChange('pin')('');
                                props.onPinEntered(value);
                            } else {
                                handleChange('pin')(value);
                            }
                        }}
                        secureTextEntry={true}
                        onBlur={handleBlur('pin')}
                        maxLength={4}
                        value={values.pin}
                    />
                </View>
            )}
        </Formik>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        padding: 20,
        paddingBottom: 'auto',
        height: '100%',
    },
    textInput: {
        padding: 10,
        margin: 10,
        color: 'white',
        fontSize: 24,
        borderBottomWidth: 1,
        borderBottomColor: 'white',
    },
    numberInput: {
        padding: 10,
        margin: 10,
        color: 'white',
        fontSize: 36,
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        letterSpacing: 12,
        textAlign: 'center',
    },
    heading: {
        fontSize: 48,
        paddingBottom: 50,
    },
    warning: {
        color: 'red',
    }
});
