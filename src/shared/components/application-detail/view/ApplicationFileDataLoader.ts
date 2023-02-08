import { HrLinkRepositoryInterface } from "@/service/repositories/HrLinkRepository";
import { FileDataLoaderInterface } from "@/types/FileDataLoaderInterface";

export class ApplicationFileDataLoader implements FileDataLoaderInterface {
  constructor(private repository: HrLinkRepositoryInterface) {}

  load(id: string): Promise<Blob> {
    return this.repository.getApplicationFile(id);
  }
}