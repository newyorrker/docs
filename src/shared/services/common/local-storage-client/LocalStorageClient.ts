import { parseJson } from "@/shared/helpers/json";

export class LocalStorageClient {
    constructor() {
        this.storage = window.localStorage;
    }

    private storage?: Storage;

    set<T>(key: string, data: T) {
        this.storage?.setItem(key, JSON.stringify(data));
    }

    get<T>(key: string): T | null | undefined {
        return parseJson(this.storage?.getItem(key));
    }
}