import { DateTime } from "luxon";
import { DocumentUserProfileModel } from "../HrLinkDocument/DocumentUserProfileModel";

export interface HrLinkApplicationInterface {
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
    createdAt: DateTime;

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
    creator: DocumentUserProfileModel;

    /**
     * Получатель заявления
     */
    approver: DocumentUserProfileModel;
}