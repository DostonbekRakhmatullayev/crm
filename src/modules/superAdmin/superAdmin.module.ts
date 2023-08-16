import { Module } from '@nestjs/common';
import { SuperAdminController } from './superAdmin.controller';
import { SuperAdminServic } from './superAdmin.servic';

@Module({
  imports: [],
  controllers: [SuperAdminController],
  providers: [SuperAdminServic],
})
export class SuperAdminModule {}
