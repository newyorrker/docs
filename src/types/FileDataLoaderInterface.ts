export interface FileDataLoaderInterface {
    load(id: string): Promise<Blob>;
}