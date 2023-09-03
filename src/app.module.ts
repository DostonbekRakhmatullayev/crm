import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './config';
import { typeOrmAsyncConfig } from './config/database';
import { AdminModule } from './modules/Admin/admin.module';
import { WorkersModule } from './modules/workers/workers.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { ProvidersModule } from './modules/provinces/provices.module';
import { MonthlyModule } from './modules/monthly/monthly.module';

@Module({
  imports: [
    AdminModule,
    CategoriesModule,
    ProvidersModule,
    MonthlyModule,
    WorkersModule,
    ConfigModule.forRoot(config),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
  ],
})
export class AppModule {}
