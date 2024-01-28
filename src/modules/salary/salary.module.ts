import { MiddlewareConsumer, Module } from '@nestjs/common';
import { CheckTokenMiddleware } from 'src/middleware/checktoken.middleware';
import { MonthlyController } from './salary.controller';
import { SalaryService } from './salary.service';

@Module({
  imports: [],
  controllers: [MonthlyController],
  providers: [SalaryService],
})
export class MonthlyModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckTokenMiddleware).forRoutes('/monthly');
  }
}
