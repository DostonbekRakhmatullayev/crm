import { Module } from '@nestjs/common';
import { userController } from './workers.controller';
import { userService } from './workers.service';

@Module({
  imports: [],
  controllers: [userController],
  providers: [userService],
})
export class WorkersModule {}
