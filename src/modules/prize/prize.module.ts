import { MiddlewareConsumer, Module } from '@nestjs/common';

import { PrizeController } from './prize.controller';
import { CheckTokenMiddleware } from 'src/middleware/checktoken.middleware';
import { PrizeService } from './prize.service';

@Module({
  imports: [],
  controllers: [PrizeController],
  providers: [PrizeService],
})
export class PrizeModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckTokenMiddleware).forRoutes('/prize');
  }
}
