export * from './address.interface'
export * from './user.interface';
export * from './account.interface';
export * from './account_detail.interface';
export * from './table/table.interface';
export * from './schedule.interface';
export * from './rest.interface';
export type TLanguage = 'id' | 'en';

export type TSort = 0 | 1 | 2;
export enum ESort {
  NONE = 0,
  ASCENDED = 1,
  DESCENDED = 2,
}

export interface IOption {
  label: string,
  value: string | number,
}

export const CountryId = {
  INDONESIA: 2,
};

export const StatusCode = {
  SUCCESS: 200,
  CREATED: 201,
  VALIDATION_ERROR: 202,
  SERVER_ERROR: 500,
  UNAUTHENTICATED: 401,
  NOT_FOUND: 404,
  NO_INTERNET: 0,
  PAYLOAD_TOO_LARGE: 413,
}

export const DEFAULT_PAGINATION_PER_PAGE = 50;

/**
 * COLLECT:
 * Term for how package from user collected by vendor
 * is it dropped directly to vendor's workshop by either user or local courier
 * or picked up by vendor
 * @property: metode_antar
*/
export type TCollectMethod = '1' | '2';
export enum ECollectMethodLabel {
  DROP = '1',
  PICKUP = '2',
  FALLBACK = 'FALLBACK',
}
export const CollectMethod = {
  DROP: '1',
  PICKUP: '2',
}
export const CollectMethodLabel: Record<ECollectMethodLabel, string> = {
  [ECollectMethodLabel.DROP]: 't_drop',
  [ECollectMethodLabel.PICKUP]: 't_pickup',
  [ECollectMethodLabel.FALLBACK]: 't_dash',
}

/**
 * DROP:
 * Term for how user drop their package to vendor
 * is it dropped directly by user
 * or using local courier
 * @property: jenis_antar
 */
export const DropMethod = {
  DIRECT_AGENT: '1',
  LOCAL_COURIER: '2',
}
export const DropMethodTypeLabel = {
  DIRECT_AGENT: 't_direct_agent',
  LOCAL_COURIER: 't_local_courier'
}

/**
 * SHIPMENT:
 * Term for what how package shipped between country
 * is it through flight or shipping container
 * @property: tipe_pengiriman
 */
export type TShipmentType = '1' | '2';
export enum EShipmentTypeLabel {
  FLIGHT = '1',
  VOYAGE = '2',
  FALLBACK = 'FALLBACK',
}
export const ShipmentTypeLabel: Record<EShipmentTypeLabel, string> = {
  [EShipmentTypeLabel.FLIGHT]: 't_flight',
  [EShipmentTypeLabel.VOYAGE]: 't_voyage',
  [EShipmentTypeLabel.FALLBACK]: 't_dash',
}

export const ContainerType = {

}
export const ContainerTypeLabel = {

}

// ?? PARCEL STATUS ?? //
export enum EStatusParcel {
  B02,
  I01,
  I02,
  I03,
  FALLBACK,
};
export enum EStatusParcelLabel {
  TO_WORKSHOP = 'B02',
  INBOUND_INIT = 'I01',
  INBOUND_VALIDATED = 'I02',
  TO_OUTBOUND = 'I03',
  FALLBACK = 'FALLBACK',
}
export const StatusParcel: Record<EStatusParcelLabel, EStatusParcel> = {
  [EStatusParcelLabel.TO_WORKSHOP]: EStatusParcel.B02,
  [EStatusParcelLabel.INBOUND_INIT]: EStatusParcel.I01,
  [EStatusParcelLabel.INBOUND_VALIDATED]: EStatusParcel.I02,
  [EStatusParcelLabel.TO_OUTBOUND]: EStatusParcel.I03,
  [EStatusParcelLabel.FALLBACK]: EStatusParcel.FALLBACK,
}
export const StatusParcelLabel: Record<EStatusParcelLabel, string> = {
  [EStatusParcelLabel.TO_WORKSHOP]: 't_to_workshop',
  [EStatusParcelLabel.INBOUND_INIT]: 't_inbound',
  [EStatusParcelLabel.INBOUND_VALIDATED]: 't_inbound_validated',
  [EStatusParcelLabel.TO_OUTBOUND]: 't_to_outbound',
  [EStatusParcelLabel.FALLBACK]: 't_dash',
}

// ?? PICKUP STATUS ?? //
export enum EPickupStatus {
  PIK01,
  PIK02,
  PIK03,
  FALLBACK
}
export enum EPickupStatusLabel {
  CREATED = 'PIK01',
  ON_DELIVER = 'PIK02',
  CANCELLED = 'PIK03',
  FALLBACK = 'FALLBACK',
}
export const PickupStatus = {
  CREATED: 'PIK01',
  ON_DELIVER: 'PIK02',
  CANCELLED: 'PIK03',
}
export const PickupStatusLabel: Record<EPickupStatusLabel, string> = {
  [EPickupStatusLabel.CREATED]: 't_open_for_schedule',
  [EPickupStatusLabel.ON_DELIVER]: 't_on_pickup',
  [EPickupStatusLabel.CANCELLED]: 't_cancelled',
  [EPickupStatusLabel.FALLBACK]: 't_dash',
}
export const PickupStatusTheme: Record<EPickupStatusLabel, string> = {
  [EPickupStatusLabel.CREATED]: 'yellow',
  [EPickupStatusLabel.ON_DELIVER]: 'green',
  [EPickupStatusLabel.CANCELLED]: 'primary',
  [EPickupStatusLabel.FALLBACK]: 'secondary',
}

// ?? INBOUND STATUS ?? //
export type TInboundStatus = 'B02' | 'I01' | 'I02' | 'I03';
export enum EInboundStatus {
  INCOMING = 'B02',
  INVALIDATED = 'I01',
  VALIDATED = 'I02',
  PENDING = 'I03',
  FALLBACK = 'FALLBACK',
}

export type TGoodsActiveStatus = 0 | 1;
export enum EGoodsActiveStatus {
  INACTiVE = 0,
  ACTIVE = 1,
}

// ?? PAYMENT STATUS ?? //
export type TPaymentStatus = 'P01' | 'P02';
export enum EPaymentStatus {
  PENDING = 'P01',
  PAID = 'P02',
  FALLBACK = 'FALLBACK',
};
export const PaymentStatusLabel: Record<EPaymentStatus, string> = {
  [EPaymentStatus.PENDING]: 't_unpaid_yet',
  [EPaymentStatus.PAID]: 't_paid',
  [EPaymentStatus.FALLBACK]: 't_unpaid_yet',
}
export const PaymentStatusTheme: Record<EPaymentStatus, string> = {
  [EPaymentStatus.PENDING]: 'yellow',
  [EPaymentStatus.PAID]: 'green',
  [EPaymentStatus.FALLBACK]: 'yellow',
}

export type TPrintSize = 'A4' | 'THERMAL_KECIL' | 'THERMAL_BESAR';
export enum EPrintSize {
  A4 = 'A4',
  THERMAL_KECIL = 'THERMAL_KECIL',
  THERMAL_BESAR = 'THERMAL_BESAR',
};
export const PrintSize: Record<EPrintSize, number[]> = {
  [EPrintSize.A4]: [297, 210],
  [EPrintSize.THERMAL_KECIL]: [58, 30],
  [EPrintSize.THERMAL_BESAR]: [102, 127],
}

// ?? MANIFEST STATUS ?? //
export type TManifestStatus = 'OPEN'
export enum EManifestStatus {
  OPEN = 'OPEN',
  FALLBACK = 'FALLBACK',
}
export const ManifestStatus: Record<EManifestStatus, string> = {
  [EManifestStatus.OPEN]: 'OPEN',
  [EManifestStatus.FALLBACK]: '-',
}

export type TManifestStatusLocal = 'DRAFT' | 'OPEN' | 'CONFIRMED' | 'CLOSED';
export enum EManifestStatusLocal {
  DRAFT = 'DRAFT',
  OPEN = 'OPEN',
  CONFIRMED = 'CONFIRMED',
  CLOSED = 'CLOSED',
  FALLBACK = 'FALLBACK',
}
export const ManifestStatusLocal: Record<EManifestStatusLocal, string> = {
  [EManifestStatusLocal.DRAFT]: 'DRAFT',
  [EManifestStatusLocal.OPEN]: 'OPEN',
  [EManifestStatusLocal.CONFIRMED]: 'CONFIRMED',
  [EManifestStatusLocal.CLOSED]: 'CLOSED',
  [EManifestStatusLocal.FALLBACK]: '-',
}