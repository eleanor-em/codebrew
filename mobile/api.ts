// For mocking up
const validSmsCode = '123456';
const alicePatientKey = 'abasbabbasbdasdguyewuh';

async function registerPatient(phoneNumber: string, name: string): Promise<boolean> {
    // TODO: mock function
    return true;
}

async function checkSmsCode(smsCode: string): Promise<string | null> {
    // TODO: mock function
    if (smsCode == validSmsCode) {
        return alicePatientKey;
    } else {
        return null;
    }
}

export {
    registerPatient,
    checkSmsCode
};