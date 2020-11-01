import { Controller, Get } from '@nestjs/common';
import { HealthCheck } from '@nestjs/terminus';
import { HealthService } from './health.service';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get('/check-catalog-typeorm')
  @HealthCheck()
  checkCatalogTypeorm() {
    return this.healthService.checkCatalogTypeorm();
  }

  @Get('/check-catalog-disk')
  @HealthCheck()
  checkDisk() {
    return this.healthService.checkDisk();
  }

  @Get('/check-catalog-memory')
  @HealthCheck()
  checkMemory() {
    return this.healthService.checkMemory();
  }
}
