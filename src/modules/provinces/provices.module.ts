import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ChikTokenMiddleware } from 'src/middleware/checktoken.middleware';
import { ProvicesController } from './provices.controller';
import { ProvicesServic } from './provices.servic';

@Module({
  imports: [],
  controllers: [ProvicesController],
  providers: [ProvicesServic],
})
export class ProvidersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ChikTokenMiddleware).forRoutes('/provices');
  }
}
