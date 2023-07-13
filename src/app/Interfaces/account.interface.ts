export interface IListAccount {
    result: IAccount[];
    next_page?: number;
    show: number;
    total: number;
}

export interface IAccount {
    id: number;
    uuid: string;
    brand_name: string;
    legal_name: string;
    account_type: number;
    created_at: string;
    updated_at: Date;
    holder: Holder;
    status: number;
    logo: string;
}

export interface Holder {
    name: string;
    phone: string;
}