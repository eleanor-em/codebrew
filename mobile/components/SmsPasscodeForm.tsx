import React from 'react';
import {Alert, StyleSheet} from 'react-native';
import {Text, View} from '../components/Themed';
import {Button, TextInput} from 'react-native';
import {Formik} from 'formik';

interface SmsPasscodeFormProps {
    phoneNumber: string,
    onCodeEntered(passcode: string): void,
    onBack(): void,
}

export default function SmsPasscodeForm(props: SmsPasscodeFormProps) {

    return (
        <Formik
            initialValues={{ passcode: '' }}
            onSubmit={() => {}}
        >
            {({handleChange, handleBlur, handleSubmit, values}) => (
                <View>
                    <Text style={styles.heading}>Sign up</Text>
                    <Text>We texted a passcode to {props.phoneNumber}. Enter this code below:</Text>
                    <TextInput
                        style={styles.numberInput}
                        autoCompleteType="tel"
                        keyboardType="numeric"
                        onChangeText={value => {
                            if (value.length == 6) {
                                props.onCodeEntered(value);
                            }
                            handleChange('passcode')(value);
                        }}
                        onBlur={handleBlur('passcode')}
                        maxLength={6}
                        value={values.passcode}
                    />
                    <Button onPress={props.onBack} title="Go Back"/>
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
        textAlign: 'center',
        letterSpacing: 12,
        fontFamily: 'space-mono',
    },
    heading: {
        fontSize: 48,
        paddingBottom: 50,
    }
});
