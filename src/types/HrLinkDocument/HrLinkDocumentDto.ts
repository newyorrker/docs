import { DocumentCreator } from "./DocumentCreator";

/**
 * this is dto
 */
export interface HrLinkDocumentDto {
    /**
     * Datestring
     */
    createdAt: string;
    creator: DocumentCreator;
    id: string;
    name: string;
    number: number | null;
    rejected: boolean;
    rejectedAt: string | null;
    rejectionComment:string | null;

    /**
     * Datestring
     */
    sentAt: string;
    signed: boolean;

    /**
     * Datestring
     */
    signedAt: string | null;

    type: string;
}