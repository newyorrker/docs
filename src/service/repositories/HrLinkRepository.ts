import { ApplicationsTypesResponse, HRLinkApplicationRequest } from "@/types/HRLinkApplication";
import { HRLinkApplicationDto } from "@/types/HRLinkApplication/HrLinkApplicationDto";
import { HrLinkApplicationModel } from "@/types/HRLinkApplication/HrLinkApplicationModel";
import { HrLinkDocumentDto } from "@/types/HrLinkDocument/HrLinkDocumentDto";
import { HrLinkDocumentModel } from "@/types/HrLinkDocument/HrLinkDocumentModel";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import Api from "../network/api";
import { THRLinkDocumentRequest } from "./types";

export interface HrLinkRepositoryInterface {
    getDocuments(query?: THRLinkDocumentRequest, config?: AxiosRequestConfig): Promise<HrLinkDocumentModel[]>;
    getDocument(id: string): Promise<HrLinkDocumentModel>;
    getDocumentFile(documentId: string) : Promise<Blob>;

    startSign(id: string): any;
    confirmSign(id: string, requestId: string, code: string): any;
    rejectSign(id: string, reason: string): any;


    getApplication(id: string): Promise<HrLinkApplicationModel | null>;
    getApplicationFile(applicationId: string): Promise<Blob>;
    getApplicationsTypes(): Promise<ApplicationsTypesResponse>;
    createApplication(query: HRLinkApplicationRequest): Promise<HRLinkApplicationDto>;


}

export class HrLinkRepository implements HrLinkRepositoryInterface {

    api: Api;

    constructor() {
        this.api = Api.getInstance();
    }

    async getDocuments(query?: THRLinkDocumentRequest, config?: AxiosRequestConfig): Promise<HrLinkDocumentModel[]> {
        return this.api.client.post<HrLinkDocumentDto[]>("/hrlink/documents/query", query, config)
            .then((response) => {
                return response.data.map((item) => new HrLinkDocumentModel(item))
            });
    }
    async getDocument(id: string) {
        return this.api.client.get(`/hrlink/documents/${id}`)
            .then((response) => {
                return new HrLinkDocumentModel(response.data);
            });
    }
    async getDocumentFile(documentId: string): Promise<Blob> {

        return this.api.client.get<any, AxiosResponse<Blob>>(`/hrlink/documents/${documentId}/file`, {
            responseType: 'blob',
        })
        .then(async (response) => {
            return response.data;
        });
    }
    async startSign(id: string) {
        return await this.api.client.post<null, AxiosResponse<{requestId: string}>>(`/hrlink/documents/${id}/sign`)
            .then((response) => {
                return response.data.requestId;
            });
    }
    async confirmSign(id: string, requestId: string, code: string) {
        return await this.api.client.put(`/hrlink/documents/${id}/sign`, { id, requestId, code });
    }
    async rejectSign(id: string, reason: string) {
        await this.api.client.post(`/hrlink/documents/${id}/sign/reject`, { reason });
    }

    async getApplication(id: string): Promise<HrLinkApplicationModel | null> {
        return this.api.client.post(`/hrlink/applications/query`, {take: 1, where: { id: id }})
            .then((response) => {
                return response.data[0] ? new HrLinkApplicationModel(response.data[0]) : null;
            });
    }

    async getApplicationsTypes() {
        return await this.api.client.get('/hrlink/applications/types')
            .then((response) => response.data)
    }
    async createApplication(query: HRLinkApplicationRequest) {
        return await this.api.client.post<HRLinkApplicationDto>('/hrlink/applications', query)
            .then((response) => {
                return response.data;
            })
    }

    async getApplicationFile(applicationId: string) {
        return this.api.client.get<any, AxiosResponse<Blob>>(`/hrlink/application/${applicationId}/file`, {
            responseType: 'blob',
        })
        .then(async (response) => {
            return response.data;
        });
    }
}