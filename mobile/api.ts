// For mocking up
const validSmsCode = '123456';
const alicePatientKey = 'abasbabbasbdasdguyewuh';

async function registerPatient(phoneNumber: string, name: string): Promise<boolean> {
    const response = await fetch('http://localhost:5000/registerPatient', {
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

export {
    registerPatient,
    checkSmsCode
};