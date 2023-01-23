import { HrLinkRepositoryInterface } from "@/service/repositories/HrLinkRepository";
import Axios, { CancelTokenSource } from "axios";
import { QueryFabricInterface } from "./DocumentsListQueryFabric";

export class DocumentsListService {

    private cancelToken?: CancelTokenSource;

    constructor(
        private queryFabric: QueryFabricInterface,
        private hrLinkRepository: HrLinkRepositoryInterface
    ) {

    }

    async load(filterState: any) {
        const queryParams = this.queryFabric.getQuery(filterState);

        if (this.cancelToken) {
            this.cancelToken.cancel();
        }

        this.cancelToken = Axios.CancelToken.source();


        return await this.hrLinkRepository.getDocuments(queryParams, { cancelToken: this.cancelToken.token });
    }
}