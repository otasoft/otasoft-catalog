import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import {
  DiskHealthIndicator,
  HealthCheckService,
  MemoryHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

@Injectable()
export class HealthService {
  constructor(
    private readonly healthCheckService: HealthCheckService,
    private readonly diskHealthIndicator: DiskHealthIndicator,
    private readonly memoryHealthIndicator: MemoryHealthIndicator,
    private readonly typeOrmHealthIndicator: TypeOrmHealthIndicator,
  ) {}

  @Cron(CronExpression.EVERY_30_MINUTES)
  checkDisk() {
    return this.healthCheckService.check([
      () =>
        this.diskHealthIndicator.checkStorage('otasoft-catalog', {
          thresholdPercent: 0.9,
          path: '/',
        }),
    ]);
  }

  @Cron(CronExpression.EVERY_30_MINUTES)
  checkMemory() {
    return this.healthCheckService.check([
      () =>
        this.memoryHealthIndicator.checkHeap('memory_heap', 150 * 1024 * 1024),
      () =>
        this.memoryHealthIndicator.checkRSS('memory_rss', 150 * 1024 * 1024),
    ]);
  }

  @Cron(CronExpression.EVERY_30_MINUTES)
  checkCatalogTypeorm() {
    return this.healthCheckService.check([
      () => this.typeOrmHealthIndicator.pingCheck('catalog', { timeout: 1000 }),
    ]);
  }
}
