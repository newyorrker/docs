import { AxiosInstance } from "axios";
import { ObjectRepository } from "../../../../common/api/repositories/ObjectRepository";
import { FileRepository } from "../../../../common/api/repositories/FileRepository";
import { UserRepository } from "../../../../common/api/repositories/UserRepository";
import { UgmkRepository } from "@/api/UgmkRepository";

export class Repositories {
  readonly objectRepository: ObjectRepository;
  readonly fileRepository: FileRepository;
  readonly userRepository: UserRepository;
  readonly ugmkRepository: UgmkRepository;

  constructor(client: AxiosInstance) {
    this.objectRepository = new ObjectRepository(client as any);
    this.fileRepository = new FileRepository(client as any);
    this.userRepository = new UserRepository(client as any);
    this.ugmkRepository = new UgmkRepository(client as any);
  }
}
