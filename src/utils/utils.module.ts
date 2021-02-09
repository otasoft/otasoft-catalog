import { Global, Module } from '@nestjs/common';

import { RpcExceptionService } from './exception-handling';

@Global()
@Module({
  providers: [RpcExceptionService],
  exports: [RpcExceptionService],
})
export class UtilsModule {}
