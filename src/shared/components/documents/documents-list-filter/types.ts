import { Statuses } from "@/service/repositories/types";

export interface Status<T = Statuses> {
    id: T;
    title: string;
    iconName?: "eye-icon" | "eye-strikethrough-icon" | "document-progress-icon" | "document-check-icon" | "apply-icon" | "cross-icon";
    isActive: boolean;
}