import { ResponseModel } from './responseModel';

export interface NonArrResponseModel<T> extends ResponseModel {
  data: T;
}
