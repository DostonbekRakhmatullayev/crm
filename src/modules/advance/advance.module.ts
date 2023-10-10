import { MiddlewareConsumer, Module } from '@nestjs/common';

import { AdvanceController } from './advance.controller';
import { AdvanceService } from './advance.service';
import { CheckTokenMiddleware } from 'src/middleware/checktoken.middleware';

@Module({
  imports: [],
  controllers: [AdvanceController],
  providers: [AdvanceService],
})
export class AdvanceModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckTokenMiddleware).forRoutes('/advance');
  }
}
