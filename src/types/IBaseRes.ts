export interface IBaseRes<T> {
  code: string;
  msg: string;
  data: T;
}