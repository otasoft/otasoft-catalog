import { Module } from '@nestjs/common';
import { ErrorValidationService } from './error-validation/error-validation.service';

@Module({
    providers: [ErrorValidationService]
})
export class UtilsModule {}
