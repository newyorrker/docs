import { DocumentUserProfile } from "./DocumentUserProfile";

export interface HrLinkDocumentDto {
    /**
     * Datestring
     */
    createdAt: string;

    creator: DocumentUserProfile;
    headManager: DocumentUserProfile | null;
    employees: DocumentUserProfile[];

    id: string;
    name: string;
    number: number | null;
    rejected?: boolean;
    rejectedAt: string | null;
    rejectionComment:string | null;

    /**
     * Datestring
     */
    sentAt: string;
    signed?: boolean;

    /**
     * Datestring
     */
    signedAt: string | null;

    type: string;
}