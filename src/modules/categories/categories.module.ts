import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesServic } from './categories.servic';

@Module({
  imports: [],
  controllers: [CategoriesController],
  providers: [CategoriesServic],
})
export class CategoriesModule {}
