import { DocumentUserProfile } from "../HrLinkDocument/DocumentUserProfile";

export interface HRLinkApplicationDto {
    /**
     * Идентификатор
     */
    id: string;

    /**
     * Идентификатор группы заявлений
     */
    applicationGroupId: string;

    /**
     * Дата создания
     */
    createdAt: string;

    /**
     * Номер
     */
    number: String

    /**
     * Идентификатор типа
     */
    typeId: string;

    /**
     * Тип заявления
     */
    typeName: string;

    /**
     * Создатель заявления
     */
    creator: DocumentUserProfile;

    /**
     * Получатель заявления
     */
    approver: DocumentUserProfile;
}