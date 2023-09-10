import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ChikTokenMiddleware } from 'src/middleware/chiktoken.middleware';
import { PricController } from './price.controller';
import { PricServic } from './price.servic';

@Module({
  imports: [],
  controllers: [PricController],
  providers: [PricServic],
})
export class PriceModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ChikTokenMiddleware).forRoutes('/price');
  }
}
