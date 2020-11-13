import { Global, Module } from '@nestjs/common';

import { ErrorValidationService } from './error-validation';
import { RpcExceptionService } from './exception-handling';

@Global()
@Module({
  providers: [ErrorValidationService, RpcExceptionService],
  exports: [ErrorValidationService, RpcExceptionService],
})
export class UtilsModule {}
