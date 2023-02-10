import { THRLinkDocumentRequest, THRLinkDocumentRequestWhere } from "@/service/repositories/types";
import { PagingStateInterface } from "@/types/PagingStateInterface";
import { QueryFabricInterface } from "@/types/QueryFabric/QueryFabricInterface";


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
        };

        return queryParams;
    }

}