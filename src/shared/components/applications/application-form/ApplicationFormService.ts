import { LocalStorageClient } from "@/shared/services/common/local-storage-client/LocalStorageClient";
import { UserProfile } from "../../../../../../../common/api/models/UserProfile";
import { SelectorItem } from "@/shared/components/controls/select/types";
import { HrLinkRepositoryInterface } from "@/service/repositories/HrLinkRepository";

export class ApplicationFormService {
    constructor(
        private hrLinkRepository: HrLinkRepositoryInterface,
        private localStorageClient: LocalStorageClient,
        private userId: number
    ) {

    }

    async getApproversList(currentUserDirectionId: string, currentUserId: number): Promise<UserProfile[]> {

        const query = {
            include: ["firstName", "firstNameRaw", "lastName", "lastNameRaw", "middleName", "middleNameRaw", "userId", "position", "positionRaw", "photoFileId"],
            where: { directionId: currentUserDirectionId }, take: -1
        }

        const list = await this.hrLinkRepository.getColleagues(query);

        return list.filter(item => item.userId !== currentUserId);
    }

    /**
     * Сохранить в LS выбранного получателя
     * @param selectedApproveruserId
     */
    public storeSelectedApprover(selectedApproveruserId: number) {
        this.localStorageClient.set(this.getApproversLsKey(this.userId), selectedApproveruserId);
    }

    /**
     * Восстановить из LS выбранного получателя
     */
    public restoreSelectedApprover(approversList: SelectorItem[]) {
        const storedApproverId = this.localStorageClient.get<number>(this.getApproversLsKey(this.userId)) || null;
        const storedApprover = approversList.find(a => a.id === storedApproverId);

        if(!storedApprover) {
        return;
        }

        return storedApproverId;
    }

    /**
     * Сохранение данных системных полей в LS
     * @param data
     */
    public storeSystemValues(data: [string, FormDataEntryValue][]) {
        this.localStorageClient.set(this.getSystemFieldsLsKey(this.userId), data);
    }

    /**
     * Восстановление данных системных полей из LS
     */
    public restoreSystemValues() {
        return this.localStorageClient.get<[string, any][]>(this.getSystemFieldsLsKey(this.userId)) || null;
    }

    private getApproversLsKey(userId: number) {
        return 'selected-approver-id_' + userId
      }

    private getSystemFieldsLsKey(userId: number) {
        return 'saved-system-fields_' + userId
    }
}