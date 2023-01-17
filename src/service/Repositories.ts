import { Repositories } from "@/api/Repositories";
import { client } from "@/api/client";

export const repositories = new Repositories(client as any);
