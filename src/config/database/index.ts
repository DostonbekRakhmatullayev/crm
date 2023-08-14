import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { Admin } from 'src/entities/admin.entities';
import { Categories } from 'src/entities/categories.entities';
import { SupperAdmin } from 'src/entities/supperAdmin.entities';
import { Workers } from 'src/entities/workers.entities';
import { Provinces } from 'src/entities/provinces.entities';
import { Monthly } from 'src/entities/monthly.entities';
export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  useFactory: async () => {
    return {
      type: 'postgres',
      username: String(process.env.USER),
      password: String(process.env.PASSWORD),
      host: String(process.env.HOST),
      port: 5432,
      database: String(process.env.DATABASE),
      entities: [SupperAdmin, Admin, Categories, Provinces, Workers, Monthly],
      logging: true,
      synchronize: false,
    };
  },
};
