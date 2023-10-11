import { MiddlewareConsumer, Module } from '@nestjs/common';
import { CheckTokenMiddleware } from 'src/middleware/checktoken.middleware';
import { DailyController } from './Daily.controller';
import { DailyService } from './Daily.service';

@Module({
  imports: [],
  controllers: [DailyController],
  providers: [DailyService],
})
export class DailyModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckTokenMiddleware).forRoutes('/advance');
  }
}
