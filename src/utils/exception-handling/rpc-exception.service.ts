import { Injectable } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";

import { IErrorObject } from "../error-validation/error-object.interface";

@Injectable()
export class RpcExceptionService {

    throwNotFound(customErrorMessage?: string): RpcException {
        throw new RpcException({
            statusCode: 404,
            errorStatus: customErrorMessage || 'Not Found',
        });
    }

    throwCatchedException(error: IErrorObject): RpcException {
        throw new RpcException({
            statusCode: error.code,
            errorStatus: error.message,
        });
    }
}