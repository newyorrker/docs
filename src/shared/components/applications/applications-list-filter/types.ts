
export enum Statuses {
    PROCESSED = "PROCESSED",
    REJECTED = "REJECTED",
    CLAIMED = "CLAIMED",
    WITHOUT_HR_MANAGER = "WITHOUT_HR_MANAGER",
    WAITING_FOR_APPROVAL = "WAITING_FOR_APPROVAL"
}

export interface HRLinkApplicationRequestWhere {
    ids?: string[];
    hrManagerStatuses?: Statuses[];

    /**
     * Левая граница даты документа
     * @example ISO 8601 (2021-01-02)
     */
    applicationDateFrom?: string;

    /**
     * Правая граница даты документа
     * @example ISO 8601 (2021-01-02)
     */
    applicationDateTo?: string;
}