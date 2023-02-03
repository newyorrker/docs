import { UserProfileInterface } from "../../../../common/api/models/interfaces/UserProfileInterface";
import { UserProfile } from "../../../../common/api/models/UserProfile";

type UgmkUserProfileInterface = UserProfileInterface & { directionId?: string }

export class UgmkUserProfile extends UserProfile {

    directionId: string | undefined;

    constructor(data: UgmkUserProfileInterface) {
        super(data);

        this.directionId = data.directionId;
    }
}