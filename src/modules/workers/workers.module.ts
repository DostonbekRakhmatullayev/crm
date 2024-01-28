import { Module } from '@nestjs/common';
import { MiddlewareConsumer } from '@nestjs/common/interfaces';
import { CheckTokenMiddleware } from 'src/middleware/checktoken.middleware';
import { WorkersController } from './workers.controller';
import { WorkersService } from './workers.service';

@Module({
  imports: [],
  controllers: [WorkersController],
  providers: [WorkersService],
})
export class WorkersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckTokenMiddleware).forRoutes('/workers');
  }
}
