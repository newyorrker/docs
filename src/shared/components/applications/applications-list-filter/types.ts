import { Statuses } from "@/shared/components/documents/documents-list-filter/types";

export interface HRLinkApplicationRequestWhere {
    ids?: string[];
    statuses?: Statuses[];

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