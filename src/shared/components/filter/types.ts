import { Statuses } from "@/shared/components/documents/documents-list-filter/types";

export interface Status<T = Statuses> {
    id: T;
    title: string;
    iconName?: "eye-icon" | "eye-strikethrough-icon" | "document-progress-icon" | "document-check-icon" | "apply-icon" | "cross-icon";
    isActive: boolean;
}