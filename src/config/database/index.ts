import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { Admin } from 'src/entities/admin.entities';
import { Categories } from 'src/entities/categories.entities';
import { Workers } from 'src/entities/workers.entities';
import { Provinces } from 'src/entities/provinces.entities';
import { Salary } from 'src/entities/salary.entities';
import { Price } from 'src/entities/price.entities';
import { Penalty } from 'src/entities/penalty.entites';
import { Advance } from 'src/entities/advance.entities';
import { Daily } from 'src/entities/daily.entities';
import { MonthlyMonth } from 'src/entities/monthly.month.entities';
import { Prize } from 'src/entities/prize.entities';
export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  useFactory: async () => {
    return {
      type: 'postgres',
      username: String(process.env.USER),
      password: String(process.env.PASSWORD),
      host: String(process.env.HOST),
      port: 5432,
      database: String(process.env.DATABASE),
      // entities: [process.cwd(), 'dist', 'entities', '*.entities.{js,ts}'],
      entities: [
        Admin,
        Categories,
        Provinces,
        Workers,
        Salary,
        Daily,
        Price,
        Penalty,
        Advance,
        MonthlyMonth,
        Prize,
      ],
      logging: false,
      synchronize: true,
    };
  },
};
