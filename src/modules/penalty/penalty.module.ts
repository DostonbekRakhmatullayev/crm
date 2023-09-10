import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ChikTokenMiddleware } from 'src/middleware/chiktoken.middleware';
import { PenaltyController } from './penalty.controller';
import { PenaltyServic } from './penalty.servic';

@Module({
  imports: [],
  controllers: [PenaltyController],
  providers: [PenaltyServic],
})
export class PenaltyModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ChikTokenMiddleware).forRoutes('/penalty');
  }
}
