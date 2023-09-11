import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ChikTokenMiddleware } from 'src/middleware/chiktoken.middleware';
import { AdvanceController } from './advance.controller';
import { AdvanceServic } from './advance.servic';

@Module({
  imports: [],
  controllers: [AdvanceController],
  providers: [AdvanceServic],
})
export class AdvanceModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ChikTokenMiddleware).forRoutes('/advance');
  }
}
