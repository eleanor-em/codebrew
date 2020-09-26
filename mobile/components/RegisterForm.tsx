import React from 'react';
import {Alert, StyleSheet} from 'react-native';
import {Text, View} from '../components/Themed';
import {Button, TextInput} from 'react-native';
import {Formik} from 'formik';
import {isNumber} from "../utils";

interface RegisterFormProps {
    onPatientData(phoneNumber: string, name: string): void,
}

export default function RegisterForm(props: RegisterFormProps) {
    return (
        <Formik
            initialValues={{ phoneNumber: '', name: '' }}
            onSubmit={values => {
                console.log('submit: ' + JSON.stringify(values));
                props.onPatientData(values.phoneNumber, values.name);
            }}
            validate={values => {
                interface ErrType {
                    phoneNumber?: string
                }
                const errors = { } as ErrType;

                if (!isNumber(values.phoneNumber) || values.phoneNumber.length != 10) {
                    errors.phoneNumber = 'invalid phone number';
                    console.log('invalid phone number: ' + values.phoneNumber);
                }

                return errors;
            }}
        >
            {({handleChange, handleBlur, handleSubmit, values}) => (
                <View>
                    <Text style={styles.heading}>Sign up</Text>
                    <Text>Phone number:</Text>
                    <TextInput
                        style={styles.numberInput}
                        autoCompleteType="tel"
                        keyboardType="numeric"
                        onChangeText={handleChange('phoneNumber')}
                        onBlur={handleBlur('phoneNumber')}
                        maxLength={10}
                        value={values.phoneNumber}
                    />
                    <Text>Full name:</Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={handleChange('name')}
                        onBlur={handleBlur('name')}
                        value={values.name}
                    />
                    {/* Type error below is due to Formik */}
                    <Button onPress={handleSubmit} title="Register" />
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
        fontSize: 28,
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        letterSpacing: 10,
    },
    heading: {
        fontSize: 48,
        paddingBottom: 50,
    }
});
