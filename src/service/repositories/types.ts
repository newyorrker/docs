export interface DocumentQuery {
    where: any;
    take?: number;
    skip?: number;
    order?: QueryOrder;
}

export interface QueryOrder {
    by: string;
    direction: "asc" | "desc";
}

export interface QueryWhere {
    ids?: string[];
    statuses?: "DRAFT" | "IN_PROCESS" | "COMPLETED" | "REJECTED" | "DELETED";

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