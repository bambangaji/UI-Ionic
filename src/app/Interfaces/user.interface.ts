export interface IUser {
  id: number;
  name: string;
  email: string;
  role_id: number;
  status: number;
  role: IRole
}
export interface IRole {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}
export interface IUserAccessToken {
  id: number;
  token: string;
  created_at: string;
  expired_at: string;
  usr_sys_id: string;
}
export interface IUserVendor {
  uuid: string;
  name: string;
  email: string;
  ext?: any;
  phone_number?: any;
  username: string;
  users_settings?: any;
  role_id: number;
  role?: any;
  document?: any;
}