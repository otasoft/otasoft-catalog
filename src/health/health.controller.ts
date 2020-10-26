import { Controller, Get } from '@nestjs/common';
import { HealthCheck } from '@nestjs/terminus';
import { HealthService } from './health.service';

@Controller('health')
export class HealthController {
    constructor(private readonly healthService: HealthService) {}

    @Get('/check-auth-typeorm')
    @HealthCheck()
    checkAuthTypeorm() {
      return this.healthService.checkAuthTypeorm();
    }
    
    @Get('/check-dns')
    @HealthCheck()
    checkDns() {
      return this.healthService.checkDns();
    }
  
    @Get('/check-disk')
    @HealthCheck()
    checkDisk() {
      return this.healthService.checkDisk();
    }
  
    @Get('/check-memory')
    @HealthCheck()
    checkMemory() {
      return this.healthService.checkMemory();
    }
}
