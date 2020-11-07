import { Global, Module } from '@nestjs/common';
import { ErrorValidationService } from './error-validation/error-validation.service';

@Global()
@Module({
  providers: [ErrorValidationService],
})
export class UtilsModule {}
