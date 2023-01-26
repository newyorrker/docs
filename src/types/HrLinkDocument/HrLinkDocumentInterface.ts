import { DateTime } from "luxon";
import { DocumentUserProfileModel } from "./DocumentUserProfileModel";

export interface HrLinkDocumentInterface {
    createdAt: DateTime;
    creator: DocumentUserProfileModel;
    headManager: DocumentUserProfileModel | null;
    employees: DocumentUserProfileModel[];
    id: string;
    name: string;
    number?: number | null;
    rejected: boolean;
    rejectedAt?: DateTime | null;
    completelyRejected: boolean;
    rejectionComment: string | null;

    /**
     * datestring
     */
    sentAt: DateTime;

    signed: boolean;
    completelySigned: boolean;

    /**
     * datestring
     */
    signedAt?: DateTime | null;

    type: string;
}