import React from 'react';
import {Alert, StyleSheet} from 'react-native';
import {Text, View} from '../components/Themed';
import {Button, TextInput} from 'react-native';
import {Formik} from 'formik';
import {isNumber} from "../utils";

interface PinFormProps {
    onPinEntered(pin: string): void,
}

export default function PinRegisterForm(props: PinFormProps) {
    return (
        <Formik
            initialValues={{ pin: '' }}
            onSubmit={() => {}}
        >
            {({handleChange, handleBlur, handleSubmit, values}) => (
                <View>
                    <Text style={styles.heading}>Sign up</Text>
                    <Text>Please set a 4-digit PIN. This will be used to access your prescriptions.</Text>
                    <TextInput
                        style={styles.numberInput}
                        autoCompleteType="tel"
                        keyboardType="numeric"
                        onChangeText={value => {
                            if (value.length == 4) {
                                props.onPinEntered(value);
                            }
                            handleChange('pin')(value);
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
    }
});
