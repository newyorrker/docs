import { THRLinkDocumentRequest } from "@/service/repositories/types";

export interface QueryFabricInterface<T = Record<string, any>> {
    getQuery(filterState: T): THRLinkDocumentRequest;
}