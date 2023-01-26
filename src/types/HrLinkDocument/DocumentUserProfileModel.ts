
import { DateTime } from "luxon";
import { DocumentUserProfile } from "./DocumentUserProfile";
import { UserProfile }from "../../../../../common/api/models/UserProfile";
import { UserProfileInterface } from "../../../../../common/api/models/interfaces/UserProfileInterface";

export class DocumentUserProfileModel extends UserProfile {

    signedAt: DateTime | null = null;
    rejectedAt: DateTime | null = null;

    constructor(data: DocumentUserProfile) {

        super({
            ...data,
            company: data.company || undefined,
            firstName: data.firstName || data.firstNameRaw || "Неизвестное имя",
            lastName: data.lastName || data.lastNameRaw || "Неизвестная фамилия",
            middleName: data.middleName || data.middleNameRaw || "Неизвестное отчество",
            position: data.position || data.positionRaw || "",
            photoFileId: data.imageFileId ?? undefined
        });

        if(data.signeddAt) {
            this.signedAt = DateTime.fromISO(data.signeddAt);
        }

        if(data.rejectedAt) {
            this.signedAt = DateTime.fromISO(data.rejectedAt);
        }
    }
}