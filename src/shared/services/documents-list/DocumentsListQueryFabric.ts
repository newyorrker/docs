import { HRLinkItemsRequest } from "@/service/repositories/types";
import { HRLinkDocumentRequestWhere } from "@/shared/components/documents/documents-list-filter/types";
import { PagingStateInterface } from "@/types/PagingStateInterface";
import { QueryFabricInterface } from "@/types/QueryFabric/QueryFabricInterface";


export interface DocumentListFilterState extends HRLinkDocumentRequestWhere {};


export class DocumentsListQueryFabric implements QueryFabricInterface {
    constructor(
        private pagingState: PagingStateInterface
    ) {
    }

    getQuery(filterState: DocumentListFilterState): HRLinkItemsRequest<HRLinkDocumentRequestWhere> {

        let where: HRLinkDocumentRequestWhere = filterState;

        const queryParams: HRLinkItemsRequest<HRLinkDocumentRequestWhere> = {
            take: this.pagingState.take,
            skip: this.pagingState.skip,
            where
        };

        return queryParams;
    }
}