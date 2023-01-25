import { Statuses } from "@/service/repositories/types";

export interface Status<T = Statuses> {
    id: T;
    title: string;
    isActive: boolean;
}