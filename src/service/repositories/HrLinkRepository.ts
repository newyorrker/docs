import { HrLinkDocumentDto } from "@/types/HrLinkDocument/HrLinkDocumentDto";
import { HrLinkDocumentModel } from "@/types/HrLinkDocument/HrLinkDocumentModel";
import { AxiosRequestConfig } from "axios";
import Api from "../network/api";
import { THRLinkDocumentRequest } from "./types";

export interface HrLinkRepositoryInterface {
    getDocuments(query?: THRLinkDocumentRequest, config?: AxiosRequestConfig): Promise<HrLinkDocumentModel[]>
    getDocument(): any;
    getDocumentFile(documentId: string) : any;
    startSign(): any;
    confirmSign(): any;
    rejectSign(): any
}



const stringToArrayBuffer = (str: string) => {
    const fileReader = new FileReader();

    console.log(str);

    fileReader.readAsArrayBuffer(new Blob([str]));

    return new Promise((resolve, reject) => {
        fileReader.onload = () => {
            resolve(fileReader.result);
        };
        fileReader.onerror = (err) => {
            reject(err);
        };
    });
};

export class HrLinkRepository implements HrLinkRepositoryInterface {

    api: Api;

    constructor() {
        this.api = Api.getInstance();
    }

    async getDocuments(query?: THRLinkDocumentRequest): Promise<HrLinkDocumentModel[]> {
        return this.api.client.post<HrLinkDocumentDto[]>("/hrlink/documents/query", query)
            .then((response) => {
                return response.data.map((item) => new HrLinkDocumentModel(item))
            });
    }
    getDocument() {
        throw new Error("Method not implemented.");
    }
    async getDocumentFile(documentId: string) {

        return this.api.client.get(`/hrlink/documents/${documentId}/file`, {
            responseType: 'blob',
            transformResponse: [function (data) {
                let blob = new window.Blob([data], { type: 'application/pdf' })
                return window.URL.createObjectURL(blob);
            }]
        })
            .then(async (response) => {
                return response.data
                // console.dir(data.);
            });
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