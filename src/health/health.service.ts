import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';
import {
  DiskHealthIndicator,
  DNSHealthIndicator,
  HealthCheckService,
  MemoryHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

@Injectable()
export class HealthService {
  constructor(
    private readonly healthCheckService: HealthCheckService,
    private readonly dnsHealthIndicator: DNSHealthIndicator,
    private readonly diskHealthIndicator: DiskHealthIndicator,
    private readonly memoryHealthIndicator: MemoryHealthIndicator,
    private readonly typeOrmHealthIndicator: TypeOrmHealthIndicator,
    private readonly configService: ConfigService,
  ) {}

  @Cron(CronExpression.EVERY_30_MINUTES)
  checkDns() {
    return this.healthCheckService.check([
      () =>
        this.dnsHealthIndicator.pingCheck(
          'otasoft-api',
          this.configService.get<string>('CORE_URL'),
          { timeout: 1000 },
        ),
    ]);
  }

  @Cron(CronExpression.EVERY_30_MINUTES)
  checkDisk() {
    return this.healthCheckService.check([
      () =>
        this.diskHealthIndicator.checkStorage('otasoft-api', {
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
  checkAuthTypeorm() {
    return this.healthCheckService.check([
      () => this.typeOrmHealthIndicator.pingCheck('auth', { timeout: 1000 }),
    ]);
  }
}
