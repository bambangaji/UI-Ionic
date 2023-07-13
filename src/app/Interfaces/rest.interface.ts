import { IUser, IUserAccessToken } from './user.interface';

export const REST_BASE_ROUTE = 'http://192.168.1.100:8002/api/';

export const REST_ROUTE = {
  LOGIN: "login"
}

export interface IResp<T = any> {
  data?: T,
  status?: string,
  message?: string,
  error?: any,
}

export interface IPagination {
  current_page: number,
  last_page: number,
  next_page: number | null,
  per_page: number,
  total: number,
}

export interface IRespPagination<T = any[]> extends IPagination {
  data: T,
}

export interface IRespCounterPaged<C extends string | number | symbol, T = any> {
  counter: Record<C, number>,
  data: IRespPagination<T>
}

export interface IRespCounter<C extends string | number | symbol, T = any> {
  counter: Record<C, number>,
  data: T
}

export interface ILoginResp {
  user: IUser,
  access_token: IUserAccessToken
}