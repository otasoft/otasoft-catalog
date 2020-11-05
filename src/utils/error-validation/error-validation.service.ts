import { Injectable } from "@nestjs/common";
import { IErrorObject } from "./error-object.interface";

@Injectable()
export class ErrorValidationService {
    validateError(errorCode: string): IErrorObject {
        switch(errorCode) {
            case 'ER_DUP_ENTRY':
                return { code: 409, message: 'Duplicated entry' }
            default:
                return { code: 400, message: 'Bad Request' }
        }
    }
}