import { UserProfile } from "@/models/UserProfile";

export interface DocumentCreator {
    company: string;
    firstName: string;
    firstNameRaw: string;
    id:string;
    imageFileId: string;
    lastName: string;
    lastNameRaw: string;
    middleName: string;
    middleNameRaw: string;
    position: string;
    positionRaw: string;
}