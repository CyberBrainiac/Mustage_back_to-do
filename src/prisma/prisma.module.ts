import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PrismaSeederService } from './prisma-seeder.service';

@Global()
@Module({
  imports: [],
  providers: [PrismaService, PrismaSeederService],
  exports: [PrismaService, PrismaSeederService],
})
export class PrismaModule {}
