import {
  Entity,
  ManyToOne,
  OneToMany,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BaseEntity,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Advance } from './advance.entities';
import { Categories } from './categories.entities';
import { Monthly } from './monthly.entities';
import { MonthlyDaily } from './monthlyDaily.entities';
import { Penalty } from './penalty.entites';
import { Provinces } from './provinces.entities';

enum Gender {
  Male = 'male',
  Female = 'female',
}

@Entity({
  name: 'workers',
})
export class Workers extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  workers_id: string;

  @Column({
    name: 'first_name',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  first_name: string;

  @Column({
    name: 'last_name',
    type: 'varchar',
    length: 100,
  })
  last_name: string;

  @Column({
    name: 'date_of_birth',
  })
  date_of_birth: Date;

  @Column('text')
  gender: Gender;

  @Column({
    name: 'phone_number',
    type: 'varchar',
    length: 200,
  })
  phone_number: string;

  @Column({
    name: 'personal_information',
    type: 'text',
  })
  personal_information: string;

  @Column({
    name: 'personal_data',
    type: 'text',
  })
  personal_data: string;

  @Column({
    type: 'text',
    name: 'images',
  })
  images: string;

  @Column({
    name: 'isActive',
    default: 'isActive',
  })
  isActive: string;

  @OneToMany(() => MonthlyDaily, (monthlyDaily) => monthlyDaily.workers)
  monthlyDaily: MonthlyDaily[];

  @OneToMany(() => Penalty, (penalty) => penalty.workers)
  penalty: Penalty[];

  @OneToMany(() => Advance, (advance) => advance.workers)
  advance: Advance[];

  @OneToOne(() => Monthly, (monthly) => monthly.workers)
  @JoinColumn()
  monthly: Monthly;

  @ManyToOne(() => Categories, (categories) => categories.workers)
  categories: Categories;

  @ManyToOne(() => Provinces, (provinces) => provinces.workers)
  provinces: Provinces;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
