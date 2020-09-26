import {config} from './config';
import {Prescription} from "./types";

// For mocking up
const validSmsCode = '123456';
const alicePatientKey = 'abasbabbasbdasdguyewuh';

async function registerPatient(phoneNumber: string, name: string): Promise<boolean> {
    const response = await fetch(config.apiAddress + '/registerPatient', {
        method: 'POST',
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

async function checkSmsCode(smsCode: string): Promise<string | null> {
    // TODO: mock function
    if (smsCode == validSmsCode) {
        return alicePatientKey;
    } else {
        return null;
    }
}

async function getPrescriptions(phone: string, patientKey: string)
    : Promise<{ status: boolean, prescriptions: Prescription[]}> {
    return {
        status: true,
        prescriptions: [{
            drugName: 'Estradiol valerate',
            numberOfPills: 2,
            frequency: 'daily',
            duration: '',
            prescriber: 'Dr John Smith',
            currentRepeat: 2,
            totalRepeats: 5,
            expiry: new Date(),
        }, {
            drugName: 'Cyproterone acetate',
            numberOfPills: 0.25,
            frequency: 'twice weekly',
            duration: '',
            prescriber: 'Dr John Smith',
            currentRepeat: 2,
            totalRepeats: 5,
            expiry: new Date(),
        }, {
            drugName: 'Estradiol valerate',
            numberOfPills: 2,
            frequency: 'daily',
            duration: '',
            prescriber: 'Dr John Smith',
            currentRepeat: 2,
            totalRepeats: 5,
            expiry: new Date(),
        }, {
            drugName: 'Cyproterone acetate',
            numberOfPills: 0.25,
            frequency: 'twice weekly',
            duration: '',
            prescriber: 'Dr John Smith',
            currentRepeat: 2,
            totalRepeats: 5,
            expiry: new Date(),
        }, {
            drugName: 'Estradiol valerate',
            numberOfPills: 2,
            frequency: 'daily',
            duration: '',
            prescriber: 'Dr John Smith',
            currentRepeat: 2,
            totalRepeats: 5,
            expiry: new Date(),
        }, {
            drugName: 'Cyproterone acetate',
            numberOfPills: 0.25,
            frequency: 'twice weekly',
            duration: '',
            prescriber: 'Dr John Smith',
            currentRepeat: 2,
            totalRepeats: 5,
            expiry: new Date(),
        }, {
            drugName: 'Estradiol valerate',
            numberOfPills: 2,
            frequency: 'daily',
            duration: '',
            prescriber: 'Dr John Smith',
            currentRepeat: 2,
            totalRepeats: 5,
            expiry: new Date(),
        }, {
            drugName: 'Cyproterone acetate',
            numberOfPills: 0.25,
            frequency: 'twice weekly',
            duration: '',
            prescriber: 'Dr John Smith',
            currentRepeat: 2,
            totalRepeats: 5,
            expiry: new Date(),
        }]
    }
}

export {
    registerPatient,
    checkSmsCode,
    getPrescriptions
};