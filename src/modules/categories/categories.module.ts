import { Module } from '@nestjs/common';
import { MiddlewareConsumer } from '@nestjs/common/interfaces';
import { ChikTokenMiddleware } from 'src/middleware/chiktoken.middleware';
import { CategoriesController } from './categories.controller';
import { CategoriesServic } from './categories.servic';

@Module({
  imports: [],
  controllers: [CategoriesController],
  providers: [CategoriesServic],
})
export class CategoriesModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ChikTokenMiddleware).forRoutes('/categories');
  }
}
