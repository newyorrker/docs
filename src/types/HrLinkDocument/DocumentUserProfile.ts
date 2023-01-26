export interface DocumentUserProfile {
    id:string;
    company?: string | null;
    firstName: string | null;
    firstNameRaw: string | null;
    imageFileId: string | null;
    lastName: string | null;
    lastNameRaw: string | null;
    middleName: string | null;
    middleNameRaw: string | null;
    position: string | null;
    positionRaw: string | null;
    rejectedAt: string | null;
    signeddAt: string | null;
}