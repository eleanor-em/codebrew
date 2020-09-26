export type RootStackParamList = {
    Root: undefined;
    NotFound: undefined;
};

export type BottomTabParamList = {
    Prescriptions: undefined;
    Authorisation: undefined;
};

export type PrescriptionsParamList = {
    PrescriptionsScreen: undefined;
    CurrentPrescriptionsScreen: undefined;
    LastRepeatScreen: undefined;
};

export type AuthorisationParamList = {
    AuthorisationScreen: undefined;
};

export interface PatientData {
    name: string,
    phoneNumber: string,
    patientKey: string,
}

export interface PatientDataProps {
    patientData: PatientData
}

export interface Prescription {
    drugName: string,
    numberOfPills: number,
    frequency: string,
    duration: string,
    prescriber: string,
    currentRepeat: number,
    totalRepeats: number,
    expiry: Date,
}
