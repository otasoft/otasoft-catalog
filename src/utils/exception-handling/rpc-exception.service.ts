import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

import { IErrorObject } from '../error-validation';

@Injectable()
export class RpcExceptionService {
  /**
   * Method that throws an RpcException with 404 status code and custom message or 'Not Found'
   *
   * @param {string} [customErrorMessage]
   * @return {*}  {RpcException}
   * @memberof RpcExceptionService
   */
  throwNotFound(customErrorMessage?: string): RpcException {
    throw new RpcException({
      statusCode: 404,
      errorStatus: customErrorMessage || 'Not Found',
    });
  }

  /**
   * Method that throws an RpcException with catched status code and  message
   *
   * @param {IErrorObject} error
   * @return {*}  {RpcException}
   * @memberof RpcExceptionService
   */
  throwCatchedException(error: IErrorObject): RpcException {
    throw new RpcException({
      statusCode: error.code,
      errorStatus: error.message,
    });
  }
}
