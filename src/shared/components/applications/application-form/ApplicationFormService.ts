import { LocalStorageClient } from "@/shared/services/common/local-storage-client/LocalStorageClient";
import { UserProfile } from "../../../../../../../common/api/models/UserProfile";
import { ObjectRepository } from "../../../../../../../common/api/repositories/ObjectRepository";
import { UserRepository } from "../../../../../../../common/api/repositories/UserRepository";
import { SelectorItem } from "@/shared/components/controls/select/types";

export class ApplicationFormService {
    constructor(
        private userRepository: UserRepository,
        private objectRepository: ObjectRepository,
        private localStorageClient: LocalStorageClient,
        private userId: number
    ) {

    }

    async getApproversList(currentUserDirectionId: string, currentUserId: number): Promise<SelectorItem[]> {
        const profiles = await this.userRepository.profiles({ include: ["firstName", "lastName", "middleName", "userId"], where: { directionId: currentUserDirectionId }, take: -1 })

        if(!profiles.length) {
            return [];
        }

        //получить список пользователей своего подраздаления по schema UserProfiles


        const userIds = profiles
        .filter(p => p.userId !== currentUserId && p.userId)
        .map(p => p.userId as number);


      const profilesMap = new Map(profiles.map((profile) => [profile.userId, profile]));

      //по списку userIds получаем HRLinkUserSettings
      const settingsUserIds = await this.objectRepository.query<{userId: number}>("HRLinkUserSettings", { include: ['userId'], where: { userId: { $in: userIds } }, take: -1 })


      const list = settingsUserIds.filter(({userId}) => profilesMap.has(userId)).map(({userId}) => profilesMap.get(userId)) as UserProfile[];


      //restore selected approver from LS it it exist in @list

      //по полученному списку формируем итоговый список профилей для отображения в списке
      const result = list.map((item) => {
        return {
          id: item.userId as number,
          title: item.fullName
        }
      });

      return result;
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