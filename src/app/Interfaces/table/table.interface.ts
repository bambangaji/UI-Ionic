export interface ITableHeader {
    id?: string;
    label: string;
    css?: string;
    style?: string;
    data?: IExcelDataTable[];
    sort?: boolean;
    function?: boolean;
    width?: number;
    expand?: boolean;
    minWidth?: number;
    freeze?: boolean;
    content?: string;
    column_key?: string;
}
export interface IExcelDataTable {
    id?: string;
    name: string;
    value?: string;
    number?: number;
    isChecked?: boolean;
    css?: string;
    style?: string;
    isEmpty?: boolean;
    isEdit?: boolean;
    isReadOnly?: boolean;
    isExpand?: boolean;
    openEdit?: boolean;
    typeInput?: string;
    dataExpand?: any;
}
export interface IDataTable {
    id?: string;
    value: string;
    content: string;
}
export interface ITableExcel {
    headers: IHeader[];
    data: Body[];
}

export interface Body {
    id?: string;
    name: string;
    value?: string;
    number?: number;
    isChecked?: boolean;
    css?: string;
    style?: string;
    isEmpty?: boolean;
    isEdit?: boolean;
    isReadOnly?: boolean;
    isExpand?: boolean;
    openEdit?: boolean;
    typeInput?: string;
    dataExpand?: DataExpand[];
}

export interface DataExpand {
    name: string;
    css?: string;
    isChecked?: boolean;
    isEmpty?: boolean;
    isEdit?: boolean;
    id?: string;
    typeInput?: string;
    isExpand?: boolean;
    isReadOnly?: boolean;
}

export interface IHeader {
    id?: string;
    label: string;
    css?: string;
    style?: string;
    sort?: boolean;
    function?: boolean;
    width?: number;
    expand?: boolean;
    minWidth?: number;
    freeze?: boolean;
    content?: string;
}