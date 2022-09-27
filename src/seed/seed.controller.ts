import { Controller, Get } from '@nestjs/common';
import { Auth } from '../auth/decorators';
import { VALID_ROLES } from '../auth/interfaces';
import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  @Auth(VALID_ROLES.admin)
  executeSeed() {
    return this.seedService.runSeed();
  }
}
