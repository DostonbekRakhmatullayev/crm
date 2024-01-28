import { MiddlewareConsumer, Module } from '@nestjs/common';
import { CheckTokenMiddleware } from 'src/middleware/checktoken.middleware';
import { PricController } from './price.controller';
import { PricService } from './price.service';

@Module({
  imports: [],
  controllers: [PricController],
  providers: [PricService],
})
export class PriceModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckTokenMiddleware).forRoutes('/price');
  }
}
