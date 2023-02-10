import { THRLinkDocumentRequest } from "@/service/repositories/types";
import { PagingStateInterface } from "@/types/PagingStateInterface";
import { QueryFabricInterface } from "@/types/QueryFabric/QueryFabricInterface";


export class ApplicationsListQueryFabric implements QueryFabricInterface {
    constructor(
        private pagingState: PagingStateInterface
    ) {
    }

    getQuery(): THRLinkDocumentRequest {

        const queryParams: THRLinkDocumentRequest = {
            take: this.pagingState.take,
            skip: this.pagingState.skip
        };

        return queryParams;
    }

}