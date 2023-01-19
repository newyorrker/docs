import { UserProfile }from "../../../../../common/api/models/UserProfile";
import { DateTime } from "luxon";

export interface HrLinkDocumentInterface {
    createdAt: DateTime;
    creator: UserProfile;
    id: string;
    name: string;
    number?: number | null;
    rejected: boolean;
    rejectedAt?: DateTime | null;
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