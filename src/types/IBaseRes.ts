export interface IBaseRes<T> {
  code: number;
  msg: string;
  data: T;
}