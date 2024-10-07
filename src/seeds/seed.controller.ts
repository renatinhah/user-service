import { Controller, Get } from '@nestjs/common';
import { UserSeeder } from './user.seeder'; // Certifique-se de que o caminho esteja correto

@Controller('seed')
export class SeedController {
  constructor(private userSeeder: UserSeeder) {}

  @Get()
  async seed() {
    await this.userSeeder.seed();
    return 'Seeding completed';
  }
}
