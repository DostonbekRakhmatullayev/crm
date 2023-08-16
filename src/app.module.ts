import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './config';
import { typeOrmAsyncConfig } from './config/database';
import { AdminModule } from './modules/admin/admin.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { MonthlyModule } from './modules/monthly/monthly.module';
import { ProvidersModule } from './modules/provinces/provices.module';
import { SuperAdminModule } from './modules/superAdmin/superAdmin.module';
import { WorkersModule } from './modules/workers/workers.module';

@Module({
  imports: [
    SuperAdminModule,
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
