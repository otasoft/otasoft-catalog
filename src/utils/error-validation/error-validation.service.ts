import { Injectable } from '@nestjs/common';
import { IErrorObject } from './error-object.interface';

@Injectable()
export class ErrorValidationService {
  /**
   * A method that returns a correct exception object based on the errorCode provided as a parameter
   *
   * @param {string} errorCode
   * @return {*}  {IErrorObject}
   */
  validateError(errorCode: string): IErrorObject {
    switch (errorCode) {
      case 'ER_DUP_ENTRY':
        return { code: 409, message: 'Duplicated entry' };
      default:
        return { code: 400, message: 'Bad Request' };
    }
  }
}
