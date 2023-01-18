import { DateTime } from "luxon";
import { DocumentCreator } from "./DocumentCreator";

export interface HrLinkDocumentInterface {
    createdAt: DateTime;
    creator: DocumentCreator;
    id: string;
    name: string;
    number?: number | null;
    rejected: boolean;
    rejectedAt?: string | null;
    rejectionComment: string | null;

    /**
     * datestring
     */
    sentAt: DateTime;
    signed: boolean;

    /**
     * datestring
     */
    signedAt?: DateTime | null;

    type: string;
}