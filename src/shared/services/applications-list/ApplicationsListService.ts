import { HrLinkRepositoryInterface } from "@/service/repositories/HrLinkRepository";
import { QueryFabricInterface } from "@/types/QueryFabric/QueryFabricInterface";
import Axios, { CancelTokenSource } from "axios";
import { ApplicationsListFilterState } from "./ApplicationsListQueryFabric";

export class ApplicationsListService {

    private cancelToken?: CancelTokenSource;

    constructor(
        private queryFabric: QueryFabricInterface,
        private hrLinkRepository: HrLinkRepositoryInterface
    ) {

    }

    async load(filterState: ApplicationsListFilterState) {
        const queryParams = this.queryFabric.getQuery(filterState);

        if (this.cancelToken) {
            this.cancelToken.cancel();
        }

        this.cancelToken = Axios.CancelToken.source();


        return await this.hrLinkRepository.getApplications(queryParams, { cancelToken: this.cancelToken.token });
    }
}