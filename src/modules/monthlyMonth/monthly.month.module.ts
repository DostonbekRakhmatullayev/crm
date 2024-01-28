import { Module, MiddlewareConsumer } from '@nestjs/common';
import { CheckTokenMiddleware } from 'src/middleware/checktoken.middleware';
import { MonthlyMonthController } from './monthly.month.controller';
import { MonthlyMonthService } from './monthly.month.service';

@Module({
  controllers: [MonthlyMonthController],
  providers: [MonthlyMonthService],
})
export class MonthlyMonthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckTokenMiddleware).forRoutes('/full/monthl');
  }
}
