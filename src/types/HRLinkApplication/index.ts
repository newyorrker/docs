import { DocumentUserProfile } from "../HrLinkDocument/DocumentUserProfile";

export enum FieldType {
    string = "STRING",
    number = "NUMBER",
    date = "DATE"
}

export interface HRLinkApplication {
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
    createdAt: string

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
    typeName: String;

    /**
     * Создатель заявления
     */
    creator: DocumentUserProfile;

    /**
     * Получатель заявления
     */
    approver: DocumentUserProfile;
}

export interface ApplicationsTypesResponse {
    types: HRLinkApplicationType[];
    templateSystemFields: HRLinkApplicationTypeField[];
}

export interface HRLinkApplicationType {
    /**
     * Идентификатор из HRLink (uuid)
     */
    id: string;

    /**
     * Название
     */
    name: string;

    /**
     * Является ли шаблоном
     */
    templatable: boolean;

    /**
     * Активен ли
     */
    active: boolean;

    /**
     * Массив полей шаблона
     */
    templateFields: HRLinkApplicationTypeField[]
}

export interface HRLinkApplicationTypeField {
    /**
     * Идентификатор из HRLink
     */
    id: string;

    /**
     * Заголовок поля
     */
    label: string;

    /**
     * Тип поля
     */
    type: FieldType;

    /**
     * Строковый идентификатор
     */
    substitutionKey: string;

    /**
     * Порядок сортировки
     */
    sortOrder: number;

    /**
     * Обязательное ли
     */
    required: boolean;
}

export interface HRLinkApplicationRequest {
    /**
     * Дата заявления
     * ISO 8601 (2021-01-02)
     */
    date: string;

    /**
     * Идентификатор шаблона
     */
    typeId: string;

    /**
     * Идентификатор пользователя-получателя заявления
     */
    approverUserId: number;

    /**
     * Массив значений полей заявления
     */
    templateFields: HRLinkApplicationField[];

    /**
     * Массив значений глобальных полей заявлений
     */
    templateSystemFields: HRLinkApplicationField[];
}

export interface HRLinkApplicationField {
    /**
     * 	Идентификатор поля шаблона
     */
    id: string;

    /**
     * Значение поля
     */
    value: string | number;
}