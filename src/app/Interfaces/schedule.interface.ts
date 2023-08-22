export interface ISchedule {
    checked?: boolean;
    uuid: string;
    image_from?: string;
    image_to?: string;
    mawb?: string;
    airlines?: string;
    agent?: string;
    date_departed?: string;
    date_arival?: string;
    country?: string;
    vendor?: string;
    weight?: number;
    collie?: number;
    status?: string;
    PIC?: string;
    isStatus?: boolean;
    created_at: string;
    country_image?: string;
    initial_vendor?: string;
    role?: string[];
    show_column?: string;
    max_column?: string;
    bag?: number;
    est_bag?: number;
    est_weight?: number;
    no_flight?: string;
    bag_range?: string;
    total_bag?: number;
    total_collie?: number;
    bag_send?: number;
    date_flight?: string;
    loading_bag?: ILoadingBag
    total_weight?: number;
    edit_by?: string;
    edited_at?: string;
    no_resi?: string;
    komoditas?: string;
    berat_tertagih?: number;
    diperbarui?: string;
    no_bag?: string;
    total_resi?: number;
}

export interface ILoadingBag {
    siap_diangkut: number;
    diangkut: number;
    dibandara: number;

}