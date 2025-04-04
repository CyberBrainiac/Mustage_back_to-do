import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { ApiModule } from './api/api.module';
import { AppService } from './app.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule, ApiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
