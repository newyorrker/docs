export interface THRLinkDocumentRequest {
    where?: THRLinkDocumentRequestWhere;
    take?: number;
    skip?: number;
    order?: QueryOrder;
}

export interface QueryOrder {
    by: string;
    direction: "asc" | "desc";
}

enum Statuses {
    draft = "DRAFT",
    inProcess = "IN_PROCESS",
    completed = "COMPLETED",
    rejected = "REJECTED",
    deleted = "DELETED"
}

export interface THRLinkDocumentRequestWhere {
    ids?: string[];
    statuses?: Statuses[];

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