import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './config';
import { typeOrmAsyncConfig } from './config/database';
import { userModule } from './modules/workers/user.module';

@Module({
  imports: [
    userModule,
    ConfigModule.forRoot(config),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
  ],
})
export class AppModule {}
