import { HrLinkRepositoryInterface } from "@/service/repositories/HrLinkRepository";
import { FileDataLoaderInterface } from "@/types/FileDataLoaderInterface";

export class DocumentFileDataLoader implements FileDataLoaderInterface {
    constructor(private repository: HrLinkRepositoryInterface) {}

    load(id: string): Promise<Blob> {
        return this.repository.getDocumentFile(id);
    }
}