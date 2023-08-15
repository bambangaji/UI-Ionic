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
export interface ITableScheduleSettings {
    import?: boolean,
    export?: boolean,
    importData?: boolean,
    exportData?: boolean,
    search?: boolean,
    checkboxAll?: boolean,
    deleteAll?: boolean,
    confirm?: boolean,
    detail?: boolean,
    option?: boolean,
    optionRiwayat?: boolean,
    checkbox?: boolean,
    trash?: boolean,
    optionDetail?: boolean,
    optionDelete?: boolean,
    optionChange?: boolean,
    optionChangeVendor?: boolean,
    complete?: boolean,
    status?: boolean,
    mawb?: boolean,
    airlines?: boolean,
    totalCollie?: boolean,
    totalBag?: boolean,
    bagRanges?: boolean,
    collie?: boolean,
    weight?: boolean,
    departed?: boolean,
    agent?: boolean,
    print?: boolean,
    noFlight?: boolean,
    estBag?: boolean,
    estWeight?: boolean,
    bag?: boolean,
    ready?: boolean,
    infoBag?: boolean,
    destinasi?: boolean,
    created_at?: boolean,
    diperbarui?: boolean,
    loading_bag?: boolean,
    date_flight?: boolean,
    edited?: boolean,
    add_penerbangan?: boolean,
}
