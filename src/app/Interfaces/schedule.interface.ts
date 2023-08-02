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
    isStatus?: boolean;
    created_at: string;
    country_image?: string;
    initialVendor?: string;
    role?: string[];
    show_column?: string;
    max_column?: string;
    bag?: string;
    est_bag?: string;
    est_weight?: string;
    noFlight?: string;
}