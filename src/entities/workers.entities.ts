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
import { Salary } from './salary.entities';
import { Daily } from './daily.entities';
import { Penalty } from './penalty.entites';
import { Provinces } from './provinces.entities';
import { MonthlyMonth } from './monthly.month.entities';
import { Price } from './price.entities';
import { Prize } from './prize.entities';
// MonthlyMonth
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

  @OneToMany(() => Daily, (daily) => daily.workers)
  daily: Daily[];

  @OneToMany(() => MonthlyMonth, (daily) => daily.workers)
  monthlyMonth: MonthlyMonth[];

  @OneToMany(() => Penalty, (penalty) => penalty.workers)
  penalty: Penalty[];

  @OneToMany(() => Prize, (prize) => prize.workers)
  prize: Prize[];

  @OneToMany(() => Advance, (advance) => advance.workers)
  advance: Advance[];

  @OneToOne(() => Salary, (salary) => salary.workers)
  salary: Salary[];

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
