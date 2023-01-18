import { DateTime } from "luxon";
import { DocumentCreator } from "./DocumentCreator";
import { HrLinkDocumentDto } from "./HrLinkDocumentDto";
import { HrLinkDocumentInterface } from "./HrLinkDocumentInterface";

export class HrLinkDocumentModel implements HrLinkDocumentInterface {
    createdAt: DateTime;
    creator: DocumentCreator;
    id: string;
    name: string;
    number: number | null;
    rejected: boolean;
    rejectedAt?: string | null;
    rejectionComment: string | null;
    sentAt: DateTime;
    signed: boolean;
    signedAt: DateTime | null;
    type: string;

    constructor(data: HrLinkDocumentDto) {
        Object.assign(this, data);

        this.createdAt = DateTime.fromISO(data.createdAt);
        this.sentAt = DateTime.fromISO(data.sentAt);

        if(data.signedAt) {
            this.signedAt = DateTime.fromISO(data.signedAt);
        }
    }
}