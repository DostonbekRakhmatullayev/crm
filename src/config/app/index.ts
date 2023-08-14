import { registerAs } from '@nestjs/config';

interface AppConfig {
  readonly host?: string;
  readonly port?: number;
}

export const AppConfig = registerAs(
  'app',
  (): AppConfig => ({
    host: process.env.DATABASE_HOST
      ? String(process.env.DATABASE_HOST)
      : undefined,
    port: process.env.DATABASE_PORT
      ? Number(process.env.DATABASE_PORT)
      : undefined,
  }),
);
