import { IAddress } from "./address.interface";

export interface IAccountDetail {
    uuid: string;
    // holder: IHolder;
    brand_name: string;
    legal_name: string;
    address: IAddress;
    api_key: string;
    password: string;
    free_member_qty: string;
    paid_member_qty: string;
    logo: string;
    status: number;
    member_account: IMemberAccount[];
    lastmile: ILastmileElement[];
}

export interface ILastmileElement {
    discount: number;
    discount_type: string;
    isEdit?: boolean;
    status: number;
    created_at: string;
    udated_at: string;
    lastmile: ILastmileLastmile;
}

export interface ILastmileLastmile {
    
    last_mile_uuid: string;
    last_mile_code: string;
    last_mile_name: string;
    last_mile_logo: string;
}

export interface IMemberAccount {
    name: string;
    email: string,
    ext: string,
    phone: string,
    uuid:string;
    created_at: string,
    updated_at: string,
    address: IAddress;
}

export interface IMemberDetail {
    uuid:        string;
    name:        string;
    email:       string;
    ext:         string;
    phone:       string;
    created_at:  Date;
    updated_at:  Date;
    address:     IAddress;
    b2b_account: IB2BAccount;
}

export interface IB2BAccount {
    uuid:            string;
    ext:             string;
    phone:           string;
    brand_name:      string;
    legal_name:      string;
    api_key:         string;
    password:        string;
    free_member_qty: string;
    paid_member_qty: string;
    logo:            string;
    status:          number;
    created_at:      Date;
    updated_at:      Date;
}
