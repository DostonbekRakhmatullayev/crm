import { Body, Controller, Module, Post } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './config';
import { typeOrmAsyncConfig } from './config/database';
import { AdminModule } from './modules/Admin/admin.module';
import { WorkersModule } from './modules/workers/workers.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { ProvidersModule } from './modules/provinces/provices.module';
import { MonthlyModule } from './modules/salary/monthly.module';
import { ImgModule } from './modules/images/images.modules';
import { PriceModule } from './modules/price/price.module';
import { PenaltyModule } from './modules/penalty/penalty.module';
import { AdvanceModule } from './modules/advance/advance.module';
import { Daily } from './entities/daily.entities';

@Module({
  imports: [
    ConfigModule.forRoot(config),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    AdminModule,
    CategoriesModule,
    ProvidersModule,
    WorkersModule,
    MonthlyModule,
    PriceModule,
    ImgModule,
    PenaltyModule,
    AdvanceModule,
    Daily,
  ],
})
export class AppModule {}
