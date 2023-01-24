import { THRLinkDocumentRequest, THRLinkDocumentRequestWhere } from "@/service/repositories/types";
import { PagingStateInterface } from "@/types/PagingStateInterface";

export interface QueryFabricInterface<T = Record<string, any>> {
    getQuery(filterState: T): THRLinkDocumentRequest;
}

export interface DocumentListFilterState extends THRLinkDocumentRequestWhere {};


export class DocumentsListQueryFabric implements QueryFabricInterface {
    constructor(
        private pagingState: PagingStateInterface
    ) {
    }

    getQuery(filterState: DocumentListFilterState): THRLinkDocumentRequest {

        let where: THRLinkDocumentRequestWhere = filterState;

        const queryParams: THRLinkDocumentRequest = {
            take: this.pagingState.take,
            skip: this.pagingState.skip,
            where
            // order: {
            //   by: "",
            //   direction: "asc"
            // }
        };

        return queryParams;
    }

}