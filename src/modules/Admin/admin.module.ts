import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminServic } from './admin.servic';

@Module({
  imports: [],
  controllers: [AdminController],
  providers: [AdminServic],
})
export class AdminModule {}
