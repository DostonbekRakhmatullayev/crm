import { MiddlewareConsumer, Module } from '@nestjs/common';
import { CheckTokenMiddleware } from 'src/middleware/checktoken.middleware';
import { PenaltyController } from './penalty.controller';
import { PenaltyService } from './penalty.service';

@Module({
  imports: [],
  controllers: [PenaltyController],
  providers: [PenaltyService],
})
export class PenaltyModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckTokenMiddleware).forRoutes('/penalty');
  }
}
