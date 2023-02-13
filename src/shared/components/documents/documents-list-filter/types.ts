export type OtherStatuses = Statuses.notSeen | Statuses.seen | Statuses.signed | Statuses.rejected;

export enum Statuses {
    draft = "DRAFT",
    inProcess = "IN_PROCESS",
    completed = "COMPLETED",
    rejected = "REJECTED",
    deleted = "DELETED",
    notSeen = "NOT_SEEN",
    seen = "SEEN",
    signed = "SIGNED"
}

export interface HRLinkDocumentRequestWhere {
    ids?: string[];
    statuses?: Statuses[];
    employeeSignerStatuses?: OtherStatuses[];
    headSignerStatuses?: OtherStatuses[]

    /**
     * Левая граница даты документа
     * @example ISO 8601 (2021-01-02)
     */
    documentDateFrom?: string;

    /**
     * Правая граница даты документа
     * @example ISO 8601 (2021-01-02)
     */
    documentDateTo?: string;
}