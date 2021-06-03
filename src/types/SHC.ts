export default interface SHC {
    iss: string;
    iat: number;
    vc: Vc;
}

export interface Vc {
    "@context": string[];
    type: string[];
    credentialSubject: CredentialSubject;
}

export interface CredentialSubject {
    fhirVersion: string;
    fhirBundle: FhirBundle;
}

export interface FhirBundle {
    resourceType: string;
    type: string;
    entry: Entry[];
}

export interface Entry {
    resource: Resource;
}

export interface Resource {
    resourceType: string;
    name?: Name[];
    birthDate?: Date;
    gender?: string;
    vaccineCode?: VaccineCode;
    patient?: Patient;
    lotNumber?: string;
    status?: string;
    occurrenceDateTime?: Date;
    location?: Location;
    protocolApplied?: ProtocolApplied;
    note?: Note[];
}

export interface Location {
    reference: string;
    display: string;
}

export interface Name {
    family: string[] | string;
    given: string[] | string;
}

export interface Note {
    text: string;
}

export interface Patient {
    reference: string;
}

export interface ProtocolApplied {
    doseNumber: number;
    targetDisease: VaccineCode;
}

export interface VaccineCode {
    coding: Coding[];
}

export interface Coding {
    system: string;
    code: string;
}
