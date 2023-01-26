
import { DateTime } from "luxon";
import { DocumentUserProfileModel } from "./DocumentUserProfileModel";
import { HrLinkDocumentDto } from "./HrLinkDocumentDto";
import { HrLinkDocumentInterface } from "./HrLinkDocumentInterface";

export class HrLinkDocumentModel implements HrLinkDocumentInterface {
    createdAt: DateTime;
    creator: DocumentUserProfileModel;
    headManager: DocumentUserProfileModel | null;
    employees: DocumentUserProfileModel[] = [];
    id: string;
    name: string;
    number: number | null;

    /**
     * all participants of singing have rejected a document
     */
    completelyRejected: boolean;
    rejectedAt?: DateTime | null;
    rejectionComment: string | null;
    sentAt: DateTime;

    /**
     * all participants of singing have signed a document
     */
    completelySigned: boolean;
    signedAt: DateTime | null;
    type: string;

    constructor(data: HrLinkDocumentDto) {

        const sourceData = Object.assign<HrLinkDocumentDto, {completelyRejected?: boolean; completelySigned?: boolean}>(data, { completelyRejected: data.rejected, completelySigned: data.signed });

        delete sourceData.signed;
        delete sourceData.rejected;

        // const
        Object.assign(this, sourceData);

        this.createdAt = DateTime.fromISO(data.createdAt);
        this.sentAt = DateTime.fromISO(data.sentAt);

        if(data.signedAt) {
            this.signedAt = DateTime.fromISO(data.signedAt);
        }

        if(data.rejectedAt) {
            this.rejectedAt = DateTime.fromISO(data.rejectedAt);
        }

        this.creator = Object.freeze(new DocumentUserProfileModel(data.creator));

        if(data.headManager) {
            this.headManager = Object.freeze(new DocumentUserProfileModel(data.headManager));
        }

        this.employees = data.employees.map((employer) => Object.freeze(new DocumentUserProfileModel(employer)))
    }

    /**
     * current user signed a document
     */
    get signed() {
        return !!this.signedAt;
    }

    /**
     * current user rejected a document
     */
    get rejected() {
        return !!this.rejectedAt;
    }
}