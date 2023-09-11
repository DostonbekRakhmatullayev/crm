import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ChikTokenMiddleware } from 'src/middleware/chiktoken.middleware';
import { MonthlyDailyController } from './monthly.daily.controller';
import { MonthlyDailyServic } from './monthly.daily.servic';

@Module({
  imports: [],
  controllers: [MonthlyDailyController],
  providers: [MonthlyDailyServic],
})
export class MonthlyDailyModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ChikTokenMiddleware).forRoutes('/advance');
  }
}
