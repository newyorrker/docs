
import { DateTime } from "luxon";
import { DocumentCreator } from "./DocumentCreator";
import { HrLinkDocumentDto } from "./HrLinkDocumentDto";
import { HrLinkDocumentInterface } from "./HrLinkDocumentInterface";
import { UserProfile }from "../../../../../common/api/models/UserProfile";
import { UserProfileInterface } from "../../../../../common/api/models/interfaces/UserProfileInterface";

class UserProfileAdapter extends UserProfile {
    constructor(data: DocumentCreator) {

        const rightData: UserProfileInterface = {
            ...data,
            firstName: data.firstName || data.firstNameRaw,
            lastName: data.lastName || data.lastNameRaw,
            middleName: data.middleName || data.middleNameRaw,
            position: data.position || data.positionRaw,
            photoFileId: data.imageFileId
        }

        super(rightData);
    }
}

export class HrLinkDocumentModel implements HrLinkDocumentInterface {
    createdAt: DateTime;
    creator: UserProfile;
    id: string;
    name: string;
    number: number | null;
    rejected: boolean;
    rejectedAt?: DateTime | null;
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

        this.creator = Object.freeze(new UserProfileAdapter(data.creator));
    }
}