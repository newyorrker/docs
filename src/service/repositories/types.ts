export interface HRLinkItemsRequest<T> {
    where?: T;
    take?: number;
    skip?: number;
    order?: QueryOrder;
}

export interface QueryOrder {
    by: string;
    direction: "asc" | "desc";
}