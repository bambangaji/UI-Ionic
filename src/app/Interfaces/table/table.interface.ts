export interface ITableHeader {
    id?: string;
    label: string;
    css: string;
    data?: any;
    sort: boolean;
    width?: number;
    minWidth?: number;
}

export interface IDataTable {
    id?: string;
    value: string;
    content: string;
}