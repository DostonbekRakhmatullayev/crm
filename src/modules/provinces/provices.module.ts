import { Module } from '@nestjs/common';
import { ProvicesController } from './provices.controller';
import { ProvicesServic } from './provices.servic';

@Module({
  imports: [],
  controllers: [ProvicesController],
  providers: [ProvicesServic],
})
export class ProvidersModule {}
