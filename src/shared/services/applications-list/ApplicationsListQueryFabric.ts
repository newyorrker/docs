import { HRLinkItemsRequest } from "@/service/repositories/types";
import { HRLinkApplicationRequestWhere } from "@/shared/components/applications/applications-list-filter/types";
import { PagingStateInterface } from "@/types/PagingStateInterface";
import { QueryFabricInterface } from "@/types/QueryFabric/QueryFabricInterface";

export interface ApplicationsListFilterState extends HRLinkApplicationRequestWhere {};

export class ApplicationsListQueryFabric implements QueryFabricInterface {
    constructor(
        private pagingState: PagingStateInterface
    ) {
    }

    getQuery(filterState: ApplicationsListFilterState): HRLinkItemsRequest<HRLinkApplicationRequestWhere> {

        const queryParams: HRLinkItemsRequest<HRLinkApplicationRequestWhere> = {
            take: this.pagingState.take,
            skip: this.pagingState.skip
        };

        return queryParams;
    }

}