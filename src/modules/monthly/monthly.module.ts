import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ChikTokenMiddleware } from 'src/middleware/chiktoken.middleware';
import { MonthlyController } from './monthly.controller';
import { MonthlyServic } from './monthly.servic';

@Module({
  imports: [],
  controllers: [MonthlyController],
  providers: [MonthlyServic],
})
export class MonthlyModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ChikTokenMiddleware).forRoutes('/monthly');
  }
}
