import {config} from './config';
import {Drug, Prescription} from "./types";

// For mocking up
const validSmsCode = '123456';
const alicePatientKey = 'abasbabbasbdasdguyewuh';

async function registerPatient(phoneNumber: string, name: string): Promise<boolean> {
    const response = await fetch(config.apiAddress + '/registerPatient', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        body: JSON.stringify({
            phone: phoneNumber,
            name
        })
    });
    const data = await response.json();
    return data.status;
}

async function checkSmsCode(phoneNumber: string, smsCode: string): Promise<string | null> {
    const response = await fetch(config.apiAddress + '/confirmPhoneNumber', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        body: JSON.stringify({
            phone: phoneNumber,
            SMSpasscode: smsCode,
        })
    });
    const data = await response.json();
    if (data.status) {
        return data.patient_key;
    } else {
        return null;
    }
}

interface ReturnedPrescription {
    currentRepeat: number,
    drug: Drug,
    duration: string,
    expiryDate: string,
    frequency: string,
    numberOfPills: number,
    totalRepeats: number,
    prescriber: string,
}

async function getPrescriptions(phone: string, patientKey: string)
    : Promise<{ status: boolean, prescriptions: Prescription[] }> {
    const response = await fetch(config.apiAddress + '/getUserPrescriptions', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        body: JSON.stringify({
            phone,
            patient_key: patientKey
        })
    });
    const data = await response.json();
    if (data.status) {
        return {
            status: true,
            prescriptions: data.prescriptions.map(({currentRepeat, drug, duration, expiryDate, frequency, numberOfPills, totalRepeats, prescriber}: ReturnedPrescription) => {
                return {
                    drug,
                    numberOfPills,
                    frequency,
                    duration,
                    prescriber,
                    currentRepeat,
                    totalRepeats,
                    expiry: new Date(expiryDate),
                } as Prescription;
            }) as Prescription[],
        };
    } else {
        return {status: false, prescriptions: [] as Prescription[]};
    }
}

export {
    registerPatient,
    checkSmsCode,
    getPrescriptions
};