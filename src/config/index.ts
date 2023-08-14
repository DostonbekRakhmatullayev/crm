import { ConfigModuleOptions } from '@nestjs/config';
import { AppConfig } from './app';

export const config: ConfigModuleOptions = {
  load: [AppConfig],
  cache: true,
  isGlobal: true,
};
