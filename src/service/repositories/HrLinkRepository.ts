import { HrLinkDocumentDto } from "@/types/HrLinkDocument/HrLinkDocumentDto";
import { HrLinkDocumentModel } from "@/types/HrLinkDocument/HrLinkDocumentModel";
import Api from "../network/api";
import { DocumentQuery } from "./types";

export interface HrLinkRepositoryInterface {
    getDocuments(query?: DocumentQuery): Promise<HrLinkDocumentModel[]>
    getDocument(): any;
    getDocumentFile() : any;
    startSign(): any;
    confirmSign(): any;
    rejectSign(): any
}

export class HrLinkRepository implements HrLinkRepositoryInterface {

    api: Api;

    constructor() {
        this.api = Api.getInstance();
    }

    async getDocuments(query?: DocumentQuery): Promise<HrLinkDocumentModel[]> {
        return this.api.client.post<HrLinkDocumentDto[]>("/hrlink/documents/query", query)
            .then((response) => {
                return response.data.map((item) => new HrLinkDocumentModel(item))
            });
    }
    getDocument() {
        throw new Error("Method not implemented.");
    }
    getDocumentFile() {
        throw new Error("Method not implemented.");
    }
    startSign() {
        throw new Error("Method not implemented.");
    }
    confirmSign() {
        throw new Error("Method not implemented.");
    }
    rejectSign() {
        throw new Error("Method not implemented.");
    }

}